import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

import { BaseMessage } from '../../shared/services/message-factory.service';
import { Uuid } from '../../shared/services/uuid.service';
import { UserDomainEvents } from '../../users/enums/user-domain-events.enum';
import { policiesConfig } from '../config/policies.config';
import { FindPoliciesByCriteriaRequest } from '../dto/find-policies-by-criteria.request.dto';
import { FindPoliciesByCriteriaResponse } from '../dto/find-policies-by-criteria-response.dto';

const { repositoryInterface } = policiesConfig.repository;

@Injectable()
export class PoliciesFinderByCriteria {
	constructor(@Inject('CLIENT_POLICY_TRIAL') private readonly proxy: ClientProxy) {}

	async run(request: FindPoliciesByCriteriaRequest): Promise<FindPoliciesByCriteriaResponse> {
		// const query = PolicyCriteriaQuery.create(request);
		// const criteriaResult = await this.repository.findByCriteria(query);
		// return FindPoliciesByCriteriaResponse.create(query, criteriaResult);

		const message: BaseMessage = {
			data: {
				id: Uuid.random(),
				type: 'policy.trial.event',
				occurredOn: new Date(),
				attributes: { ...request },
				meta: {
					correlation: Uuid.random(),
					idempotency: Uuid.random(),
				},
			},
		};

		try {
			const trialObservable = this.proxy
				.send<any>('policy.trial.event', message)
				.pipe(timeout(10000));

			return await firstValueFrom(trialObservable);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
