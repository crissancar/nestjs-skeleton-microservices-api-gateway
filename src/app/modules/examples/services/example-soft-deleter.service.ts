import { Inject, Injectable } from '@nestjs/common';

import { examplesConfig } from '../config/examples.config';
import { SoftDeleteExampleRequest } from '../dtos/soft-delete-example-request.dto';
import { SoftDeleteExampleResponse } from '../dtos/soft-delete-example-response.dto';
import { ExampleWithIdNotExistsException } from '../exceptions/example-with-id-not-exists.exception';
import { ExampleRepository } from '../repositories/example.repository';

const { softDeleter, repository } = examplesConfig;
const { repositoryInterface } = repository;
const { context } = softDeleter.constants;

@Injectable()
export class ExampleSoftDeleter {
	constructor(@Inject(repositoryInterface) private readonly repository: ExampleRepository) {}

	async run(request: SoftDeleteExampleRequest): Promise<SoftDeleteExampleResponse> {
		const softDeletedExample = await this.repository.softDelete(request.id);

		if (!softDeletedExample) {
			throw new ExampleWithIdNotExistsException(context, request.id);
		}

		return SoftDeleteExampleResponse.create(request.id);
	}
}
