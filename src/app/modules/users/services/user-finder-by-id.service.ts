import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { BaseMessage } from '../../shared/services/message-factory.service';
import { Uuid } from '../../shared/services/uuid.service';
import { usersConfig } from '../config/users.config';
import { FindUserByIdRequest } from '../dtos/find-user-by-id-request.dto';
import { FindUserByIdResponse } from '../dtos/find-user-by-id-response.dto';
import { UserDomainEvents } from '../enums/user-domain-events.enum';
import { FindUserFailedException } from '../exceptions/find-user-failed.exception';

const { finderById } = usersConfig;
const { context } = finderById.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class UserFinderById {
	constructor(@Inject('CLIENT_FIND_USER') private readonly proxy: ClientProxy) {}

	async run(request: FindUserByIdRequest): Promise<FindUserByIdResponse> {
		const message: BaseMessage = {
			data: {
				id: Uuid.random(),
				type: UserDomainEvents.FIND,
				occurredOn: new Date(),
				attributes: { ...request },
				meta: {
					correlation: Uuid.random(),
					idempotency: Uuid.random(),
				},
			},
		};

		try {
			const foundUserObservable = this.proxy
				.send<FindUserByIdResponse>(UserDomainEvents.FIND, message)
				.pipe(timeout(10000));

			return await firstValueFrom(foundUserObservable);
		} catch (error) {
			logger.error(error);
			throw new FindUserFailedException(context);
		}
	}
}
