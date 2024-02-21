import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { BaseMessage } from '../../shared/services/message-factory.service';
import { Uuid } from '../../shared/services/uuid.service';
import { FindUsersByCriteriaRequest } from '../dtos/find-users-by-criteria.request.dto';
import { FindUsersByCriteriaResponse } from '../dtos/find-users-by-criteria-response.dto';
import { UserDomainEvents } from '../enums/user-domain-events.enum';

const logger = LoggerFactory.create('UsersFinderByCriteria');

@Injectable()
export class UsersFinderByCriteria {
	constructor(@Inject('CLIENT_FIND_USERS_BY_CRITERIA') private readonly proxy: ClientProxy) {}

	async run(request: FindUsersByCriteriaRequest): Promise<FindUsersByCriteriaResponse> {
		const message: BaseMessage = {
			data: {
				id: Uuid.random(),
				type: UserDomainEvents.FIND_BY_CRITERIA,
				occurredOn: new Date(),
				attributes: { ...request },
				meta: {
					correlation: Uuid.random(),
					idempotency: Uuid.random(),
				},
			},
		};

		try {
			const foundUsersObservable = this.proxy
				.send<FindUsersByCriteriaResponse>(UserDomainEvents.FIND_BY_CRITERIA, message)
				.pipe(timeout(10000));

			return await firstValueFrom(foundUsersObservable);
		} catch (error) {
			logger.error(error);
			throw new BadRequestException();
		}
	}
}
