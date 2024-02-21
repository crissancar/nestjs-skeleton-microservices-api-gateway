import { Inject, Injectable } from '@nestjs/common';

import { examplesConfig } from '../config/examples.config';
import { DeleteExampleRequest } from '../dtos/delete-example-request.dto';
import { DeleteExampleResponse } from '../dtos/delete-example-response.dto';
import { ExampleWithIdNotExistsException } from '../exceptions/example-with-id-not-exists.exception';
import { ExampleRepository } from '../repositories/example.repository';

const { deleter, repository } = examplesConfig;
const { repositoryInterface } = repository;
const { context } = deleter.constants;

@Injectable()
export class ExampleDeleter {
	constructor(@Inject(repositoryInterface) private readonly repository: ExampleRepository) {}

	async run(request: DeleteExampleRequest): Promise<DeleteExampleResponse> {
		const deletedExample = await this.repository.delete(request.id);

		if (!deletedExample) {
			throw new ExampleWithIdNotExistsException(context, request.id);
		}

		return DeleteExampleResponse.create(request.id);
	}
}
