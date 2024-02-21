import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { forgotPasswordsConfig } from './config/forgot-passwords.config';
import { ForgotPasswordPostController } from './controllers/forgot-password-post.controller';
import { ForgotPasswordPutController } from './controllers/forgot-password-put.controller';
import { SendgridForgotPasswordMailer } from './mailers/sendgrid-forgot-password.mailer';
import { ForgotPasswordEntity } from './persistence/forgot-password.entity';
import { TypeOrmForgotPasswordRepository } from './persistence/typeorm-forgot-password.repository';
import { ForgotPasswordCompleter } from './services/forgot-password-completer.service';
import { ForgotPasswordCreator } from './services/forgot-password-creator.service';
import { ForgotPasswordDeleter } from './services/forgot-password-deleter.service';
import { ForgotPasswordFinder } from './services/forgot-password-finder.service';
import { ForgotPasswordMailSender } from './services/forgot-password-mail-sender.service';

const { repositoryInterface } = forgotPasswordsConfig.repository;
const { mailerInterface } = forgotPasswordsConfig.mailer;

@Module({
	imports: [TypeOrmModule.forFeature([ForgotPasswordEntity]), UsersModule],
	controllers: [ForgotPasswordPostController, ForgotPasswordPutController],
	providers: [
		ForgotPasswordCompleter,
		ForgotPasswordCreator,
		ForgotPasswordDeleter,
		ForgotPasswordFinder,
		ForgotPasswordMailSender,
		{ provide: repositoryInterface, useClass: TypeOrmForgotPasswordRepository },
		{ provide: mailerInterface, useClass: SendgridForgotPasswordMailer },
	],
})
export class ForgotPasswordsModule {}
