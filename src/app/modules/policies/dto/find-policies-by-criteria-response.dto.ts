import { ApiProperty } from '@nestjs/swagger';

import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { policyPropertiesSwagger } from '../config/swagger/properties/policy-properties.swagger';
import { PolicyEntity } from '../persistence/policy.entity';
import { FindPolicyResponse } from './find-policy-response.dto';
import { PolicyCriteriaQuery } from './policy-criteria-query.dto';

const { policiesCriteria } = policyPropertiesSwagger;

export class FindPoliciesByCriteriaResponse {
	@ApiProperty(policiesCriteria)
	readonly data: Array<FindPolicyResponse>;

	readonly count: number;

	readonly currentCount: number;

	readonly take: number;

	readonly page: number;

	constructor(
		data: Array<FindPolicyResponse>,
		count: number,
		currentCount: number,
		take: number,
		page: number,
	) {
		this.data = data;
		this.count = count;
		this.currentCount = currentCount;
		this.take = take;
		this.page = page;
	}

	static create(
		query: PolicyCriteriaQuery,
		criteriaResult: CriteriaResult<PolicyEntity>,
	): FindPoliciesByCriteriaResponse {
		const { data, count } = criteriaResult;
		const { take, page } = query;
		const currentCount = data.length;

		const findPolicyResponseArray = data.map((policy) => FindPolicyResponse.create(policy));

		return new FindPoliciesByCriteriaResponse(
			findPolicyResponseArray,
			count,
			currentCount,
			take,
			page,
		);
	}
}
