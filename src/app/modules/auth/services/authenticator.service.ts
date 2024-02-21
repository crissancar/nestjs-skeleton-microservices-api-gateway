import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { BaseMessage } from '../../shared/services/message-factory.service';
import { Uuid } from '../../shared/services/uuid.service';
import { authConfig } from '../config/auth.config';
import { AuthenticatedUser } from '../dtos/authenticated-user.dto';
import { LoginUserRequest } from '../dtos/login-user-request.dto';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';

const { authenticator } = authConfig;
const { context } = authenticator.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class Authenticator {
	constructor(@Inject('CLIENT_LOCAL_STRATEGY') private readonly authProxy: ClientProxy) {}

	async run(request: LoginUserRequest): Promise<AuthenticatedUser> {
		const message: BaseMessage = {
			data: {
				id: Uuid.random(),
				type: 'local.strategy',
				occurredOn: new Date(),
				attributes: { ...request },
				meta: {
					correlation: Uuid.random(),
					idempotency: Uuid.random(),
				},
			},
		};

		try {
			const createdUserObservable = this.authProxy
				.send<AuthenticatedUser>('local.strategy', message)
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
