import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { BaseMessage } from '../../shared/services/message-factory.service';
import { Uuid } from '../../shared/services/uuid.service';
import { usersConfig } from '../config/users.config';
import { UpdateUserRequest } from '../dtos/update-user-request.dto';
import { UpdateUserResponse } from '../dtos/update-user-response.dto';
import { UserDomainEvents } from '../enums/user-domain-events.enum';
import { UpdateUserFailedException } from '../exceptions/update-user-failed.exception';

const { updater } = usersConfig;
const { context } = updater.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class UserUpdater {
	constructor(@Inject('CLIENT_UPDATE_USER') private readonly proxy: ClientProxy) {}

	async run(request: UpdateUserRequest): Promise<UpdateUserResponse> {
		const message: BaseMessage = {
			data: {
				id: Uuid.random(),
				type: UserDomainEvents.UPDATE,
				occurredOn: new Date(),
				attributes: { ...request },
				meta: {
					correlation: Uuid.random(),
					idempotency: Uuid.random(),
				},
			},
		};

		try {
			const updatedUserObservable = this.proxy
				.send<UpdateUserResponse>(UserDomainEvents.UPDATE, message)
				.pipe(timeout(10000));

			return await firstValueFrom(updatedUserObservable);
		} catch (error) {
			logger.error(error);
			throw new UpdateUserFailedException(context);
		}
	}
}
