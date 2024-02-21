import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProviderOptions, ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';

import { ApiKeysModule } from '../api-keys/api-keys.module';
import { BlacklistsModule } from '../blacklists/blacklists.module';
import { UsersModule } from '../users/users.module';
import { jwtConfig } from './config/jwt.config';
import { AuthPostController } from './controllers/auth-post.controller';
import { Authenticator } from './services/authenticator.service';
import { JwtCreator } from './services/jwt-creator.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

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
		JwtModule.register(jwtConfig),
		ClientsModule.register([
			clientFactory('CLIENT_AUTH_USER', 'auth_user_queue'),
			clientFactory('CLIENT_LOCAL_STRATEGY', 'local_strategy_queue'),
			clientFactory('CLIENT_AUTH_CREATE_TOKENS', 'auth_create_tokens_queue'),
		]),
		ApiKeysModule,
		UsersModule,
		PassportModule,
		BlacklistsModule,
	],
	controllers: [AuthPostController],
	providers: [Authenticator, JwtCreator, JwtStrategy, LocalStrategy],
	exports: [JwtCreator],
})
export class AuthModule {}
