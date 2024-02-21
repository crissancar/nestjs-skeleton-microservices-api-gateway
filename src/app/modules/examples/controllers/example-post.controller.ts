import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { ApiKeyAudiences } from '../../api-keys/enums/api-key-audiences.enum';
import { ApiKeyAuthentication } from '../../shared/decorators/api-key-authentication.decorator';
import { UuidGenerator } from '../../shared/decorators/uuid-generator.decorator';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { examplesConfig } from '../config/examples.config';
import { CreateExampleSwagger } from '../config/swagger/decorators/create-example-swagger.decorator';
import { CreateExampleRequest } from '../dtos/create-example-request.dto';
import { CreateExampleResponse } from '../dtos/create-example-response.dto';
import { ExampleCreator } from '../services/example-creator.service';

const { globalRoute, postController } = examplesConfig;
const { context } = postController.constants;
const { requestLog } = postController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class ExamplePostController {
	constructor(private readonly creator: ExampleCreator) {}

	@CreateExampleSwagger()
	@ApiKeyAuthentication(ApiKeyAudiences.ADMIN, ApiKeyAudiences.GENERAL)
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async run(
		@UuidGenerator() id: string,
		@Body() request: CreateExampleRequest,
	): Promise<CreateExampleResponse> {
		logger.log(requestLog);

		return this.creator.run({ ...request, id });
	}
}
