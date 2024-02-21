import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { BaseMessage } from '../../shared/services/message-factory.service';
import { Uuid } from '../../shared/services/uuid.service';
import { usersConfig } from '../config/users.config';
import { CreateUserRequest } from '../dtos/create-user-request.dto';
import { CreateUserResponse } from '../dtos/create-user-response.dto';
import { UserDomainEvents } from '../enums/user-domain-events.enum';
import { CreateUserFailedException } from '../exceptions/create-user-failed.exception';

const { creator } = usersConfig;
const { context } = creator.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class UserCreator {
	constructor(@Inject('CLIENT_CREATE_USER') private readonly proxy: ClientProxy) {}

	async run(request: CreateUserRequest): Promise<CreateUserResponse> {
		const message: BaseMessage = {
			data: {
				id: Uuid.random(),
				type: UserDomainEvents.CREATE,
				occurredOn: new Date(),
				attributes: { ...request },
				meta: {
					correlation: Uuid.random(),
					idempotency: Uuid.random(),
				},
			},
		};

		try {
			const createdUserObservable = this.proxy
				.send<CreateUserResponse>(UserDomainEvents.CREATE, message)
				.pipe(timeout(10000));

			return await firstValueFrom(createdUserObservable);
		} catch (error) {
			logger.error(error);
			throw new CreateUserFailedException(context);
		}
	}
}
