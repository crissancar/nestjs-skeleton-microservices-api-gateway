import { Inject, Injectable } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { TypeOrmError } from '../../shared/services/typeorm-error.service';
import { examplesConfig } from '../config/examples.config';
import { CreateExampleRequest } from '../dtos/create-example-request.dto';
import { CreateExampleResponse } from '../dtos/create-example-response.dto';
import { ExampleWithNameAlreadyExistsException } from '../exceptions/example-with-name-already-exists.exception';
import { ExampleEntity } from '../persistence/example.entity';
import { ExampleRepository } from '../repositories/example.repository';

const { creator, repository } = examplesConfig;
const { repositoryInterface } = repository;
const { context } = creator.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class ExampleCreator {
	constructor(@Inject(repositoryInterface) private readonly repository: ExampleRepository) {}

	async run(request: CreateExampleRequest): Promise<CreateExampleResponse> {
		const example = ExampleEntity.create(request.id, request.name);

		try {
			const createdExample = await this.repository.create(example);

			return CreateExampleResponse.create(createdExample);
		} catch (error) {
			if (TypeOrmError.isUnique(error as QueryFailedError)) {
				throw new ExampleWithNameAlreadyExistsException(context, example.name);
			}
			logger.error(error);
			throw error;
		}
	}
}
