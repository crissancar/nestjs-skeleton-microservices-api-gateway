import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';

import { loggerConfig } from '../config/logger/logger.config';
import { CorrelationIdMiddleware } from '../config/middlewares/correlation-id.middleware';
import { typeOrmConfig } from '../config/orm/typeorm.config';
import { providersConfig } from './app.config';
import { AppController } from './app.controller';
import { AdminUsersModule } from './modules/admin-users/admin-users.module';
import { ApiKeysModule } from './modules/api-keys/api-keys.module';
import { AuthModule } from './modules/auth/auth.module';
import { AxiosModule } from './modules/axios/axios.module';
import { BlacklistsModule } from './modules/blacklists/blacklists.module';
import { CDNModule } from './modules/cdn/cdn.module';
import { FAQsModule } from './modules/faqs/faqs.module';
import { FilesModule } from './modules/files/files.module';
import { ForgotPasswordsModule } from './modules/forgot-passwords/forgot-passwords.module';
import { ImagesModule } from './modules/images/images.module';
import { PoliciesModule } from './modules/policies/policies.module';
import { UsersModule } from './modules/users/users.module';

@Module({
	imports: [
		LoggerModule.forRoot(loggerConfig),
		TypeOrmModule.forRoot(typeOrmConfig),
		EventEmitterModule.forRoot(),
		AdminUsersModule,
		ApiKeysModule,
		AuthModule,
		AxiosModule,
		BlacklistsModule,
		CDNModule,
		FAQsModule,
		FilesModule,
		ForgotPasswordsModule,
		ImagesModule,
		PoliciesModule,
		UsersModule,
	],
	controllers: [AppController],
	providers: providersConfig,
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(CorrelationIdMiddleware).forRoutes('*');
	}
}
