import { Inject, Injectable } from '@nestjs/common';

import { examplesConfig } from '../config/examples.config';
import { FindExampleByIdRequest } from '../dtos/find-example-by-id-request.dto';
import { FindExampleByIdResponse } from '../dtos/find-example-by-id-response.dto';
import { ExampleWithIdNotExistsException } from '../exceptions/example-with-id-not-exists.exception';
import { ExampleRepository } from '../repositories/example.repository';

const { finderById, repository } = examplesConfig;
const { repositoryInterface } = repository;
const { context } = finderById.constants;

@Injectable()
export class ExampleFinderById {
	constructor(@Inject(repositoryInterface) private readonly repository: ExampleRepository) {}

	async run(request: FindExampleByIdRequest): Promise<FindExampleByIdResponse> {
		const foundExample = await this.repository.findById(request.id);

		if (!foundExample) {
			throw new ExampleWithIdNotExistsException(context, request.id);
		}

		return FindExampleByIdResponse.create(foundExample);
	}
}
