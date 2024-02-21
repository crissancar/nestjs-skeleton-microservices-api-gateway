import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { logger } from '@sentry/utils';
import { firstValueFrom, timeout } from 'rxjs';

import { BaseMessage } from '../../shared/services/message-factory.service';
import { Uuid } from '../../shared/services/uuid.service';
import { AuthenticatedUser } from '../dtos/authenticated-user.dto';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';
import { Token } from '../interfaces/token.interface';

@Injectable()
export class JwtCreator {
	constructor(@Inject('CLIENT_AUTH_CREATE_TOKENS') private readonly authProxy: ClientProxy) {}

	async run(authUser: AuthenticatedUser): Promise<Token> {
		const message: BaseMessage = {
			data: {
				id: Uuid.random(),
				type: 'auth.create.tokens',
				occurredOn: new Date(),
				attributes: { ...authUser },
				meta: {
					correlation: Uuid.random(),
					idempotency: Uuid.random(),
				},
			},
		};

		try {
			const createdUserObservable = this.authProxy
				.send<Token>('auth.create.tokens', message)
				.pipe(timeout(30000));

			return await firstValueFrom(createdUserObservable);
		} catch (error) {
			if (error.error.code === HttpStatus.UNAUTHORIZED) {
				throw new InvalidCredentialsException('LocalStrategy');
			}
			logger.error(error);
			throw new BadRequestException();
		}
	}
}
