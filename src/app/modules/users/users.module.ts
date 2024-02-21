import { Module } from '@nestjs/common';
import { ClientProviderOptions, ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { usersConfig } from './config/users.config';
import { UserDeleteController } from './controllers/user-delete.controller';
import { UserGetController } from './controllers/user-get.controller';
import { UserPostController } from './controllers/user-post.controller';
import { UserPutController } from './controllers/user-put.controller';
import { SendgridUserMailer } from './mailers/sendgrid-user.mailer';
import { TypeOrmUserRepository } from './persistence/typeorm-user.repository';
import { UserEntity } from './persistence/user.entity';
import { UserCreator } from './services/user-creator.service';
import { UserDeleter } from './services/user-deleter.service';
import { UserFinderByEmail } from './services/user-finder-by-email.service';
import { UserFinderById } from './services/user-finder-by-id.service';
import { UserFinderForAuthentication } from './services/user-finder-for-authentication.service';
import { UserFinderForStrategy } from './services/user-finder-for-strategy.service';
import { UserForgotPasswordUpdater } from './services/user-forgot-password-updater.service';
import { UserPasswordUpdater } from './services/user-password-updater.service';
import { UserSoftDeleter } from './services/user-soft-deleter.service';
import { UserUpdater } from './services/user-updater.service';
import { UsersFinderByCriteria } from './services/users-finder-by-criteria.service';

const { repositoryInterface } = usersConfig.repository;
const { mailerInterface } = usersConfig.mailer;

function clientFactory(name: string, queue: string): ClientProviderOptions {
	return {
		name,
		transport: Transport.RMQ,
		options: {
			urls: ['amqps://qagxqjke:XuoOJiC3RCN2C0E_oNuEWv1KZ6y4NGem@rat.rmq2.cloudamqp.com/qagxqjke'],
			queue,
			queueOptions: {
				durable: false,
			},
		},
	};
}

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		ClientsModule.register([
			clientFactory('CLIENT_CREATE_USER', 'create_user_queue'),
			clientFactory('CLIENT_FIND_USER', 'find_user_queue'),
			clientFactory('CLIENT_FIND_USERS_BY_CRITERIA', 'find_users_by_criteria_queue'),
			clientFactory('CLIENT_UPDATE_USER', 'update_user_queue'),
			clientFactory('CLIENT_UPDATE_USER_PASSWORD', 'update_user_password_queue'),
			clientFactory('CLIENT_SOFT_DELETE_USER', 'soft_delete_user_queue'),
			clientFactory('CLIENT_TRIAL', 'trial_queue'),
		]),
	],
	controllers: [UserPostController, UserPutController, UserGetController, UserDeleteController],
	providers: [
		UserCreator,
		UserDeleter,
		UsersFinderByCriteria,
		UserFinderByEmail,
		UserFinderById,
		UserFinderForAuthentication,
		UserFinderForStrategy,
		UserForgotPasswordUpdater,
		UserPasswordUpdater,
		UserSoftDeleter,
		UserUpdater,
		{ provide: repositoryInterface, useClass: TypeOrmUserRepository },
		{ provide: mailerInterface, useClass: SendgridUserMailer },
	],
	exports: [UserFinderForAuthentication, UserFinderForStrategy, UserForgotPasswordUpdater],
})
export class UsersModule {}
