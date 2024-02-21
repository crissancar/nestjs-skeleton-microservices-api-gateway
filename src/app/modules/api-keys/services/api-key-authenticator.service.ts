import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { BaseMessage } from '../../shared/services/message-factory.service';
import { Uuid } from '../../shared/services/uuid.service';
import { AuthenticateApiKeyRequest } from '../dtos/authenticate-api-key.request.dto';
import { AuthenticateApiKeyResponse } from '../dtos/authenticate-api-key.response.dto';
import { InvalidApiKeyException } from '../exceptions/invalid-api-key.exception';

const logger = LoggerFactory.create('ApiKeyAuthenticator');

@Injectable()
export class ApiKeyAuthenticator {
	constructor(@Inject('CLIENT_AUTH_API_KEY') private readonly authProxy: ClientProxy) {}

	async run(request: AuthenticateApiKeyRequest): Promise<AuthenticateApiKeyResponse> {
		const message: BaseMessage = {
			data: {
				id: Uuid.random(),
				type: 'auth.api.key',
				occurredOn: new Date(),
				attributes: { ...request },
				meta: {
					correlation: Uuid.random(),
					idempotency: Uuid.random(),
				},
			},
		};

		try {
			const authApiKey$ = this.authProxy
				.send<AuthenticateApiKeyResponse>('auth.api.key', message)
				.pipe(timeout(30000));

			return await firstValueFrom(authApiKey$);
		} catch (error) {
			if (error.error.code === HttpStatus.UNAUTHORIZED) {
				throw new InvalidApiKeyException('LocalStrategy');
			}
			logger.error(error);
			throw new BadRequestException();
		}
	}
}
