import { Module } from '@nestjs/common';
import { ClientProviderOptions, ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { apiKeysConfig } from './config/api-keys.config';
import { ApiKeyEntity } from './persistence/api-key.entity';
import { TypeOrmApiKeyRepository } from './persistence/typeorm-api-key.repository';
import { ApiKeyAuthenticator } from './services/api-key-authenticator.service';
import { ApiKeyFinder } from './services/api-key-finder.service';
import { ApiKeyStrategy } from './strategies/api-key.strategy';

const { repositoryInterface } = apiKeysConfig.repository;

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
		TypeOrmModule.forFeature([ApiKeyEntity]),
		ClientsModule.register([clientFactory('CLIENT_AUTH_API_KEY', 'auth_api_key_queue')]),
	],
	providers: [
		ApiKeyAuthenticator,
		ApiKeyFinder,
		ApiKeyStrategy,
		{ provide: repositoryInterface, useClass: TypeOrmApiKeyRepository },
	],
	exports: [ApiKeyFinder],
})
export class ApiKeysModule {}
