import { Inject, Injectable } from '@nestjs/common';

import { examplesConfig } from '../config/examples.config';
import { FindExamplesByCriteriaRequest } from '../dtos/find-examples-by-criteria.request.dto';
import { FindExamplesByCriteriaResponse } from '../dtos/find-examples-by-criteria-response.dto';
import { ExampleCriteriaQuery } from '../persistence/example-criteria.query';
import { ExampleRepository } from '../repositories/example.repository';

const { repositoryInterface } = examplesConfig.repository;

@Injectable()
export class ExamplesFinderByCriteria {
	constructor(@Inject(repositoryInterface) private readonly repository: ExampleRepository) {}

	async run(request: FindExamplesByCriteriaRequest): Promise<FindExamplesByCriteriaResponse> {
		const query = ExampleCriteriaQuery.create(request);

		const criteriaResult = await this.repository.findByCriteria(query);

		return FindExamplesByCriteriaResponse.create(query, criteriaResult);
	}
}
