import { ApiProperty } from '@nestjs/swagger';

import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { examplePropertiesSwagger } from '../config/swagger/properties/example-properties.swagger';
import { ExampleEntity } from '../persistence/example.entity';
import { ExampleCriteriaQuery } from '../persistence/example-criteria.query';
import { FindExampleByIdResponse } from './find-example-by-id-response.dto';

const { examplesCriteria } = examplePropertiesSwagger;

export class FindExamplesByCriteriaResponse {
	@ApiProperty(examplesCriteria)
	readonly data: Array<FindExampleByIdResponse>;

	readonly count: number;

	readonly currentCount: number;

	readonly take: number;

	readonly page: number;

	constructor(
		data: Array<FindExampleByIdResponse>,
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
		query: ExampleCriteriaQuery,
		criteriaResult: CriteriaResult<ExampleEntity>,
	): FindExamplesByCriteriaResponse {
		const { data, count } = criteriaResult;
		const { take, page } = query;
		const currentCount = data.length;

		const findExampleResponseArray = data.map((example) => FindExampleByIdResponse.create(example));

		return new FindExamplesByCriteriaResponse(
			findExampleResponseArray,
			count,
			currentCount,
			take,
			page,
		);
	}
}
