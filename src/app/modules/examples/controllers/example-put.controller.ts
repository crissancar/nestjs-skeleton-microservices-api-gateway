import { Body, Controller, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';

import { EndpointOwnerAuthentication } from '../../shared/decorators/endpoint-owner-authentication.decorator';
import { UserAudiences } from '../../shared/enums/user-audiences.enum';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { examplesConfig } from '../config/examples.config';
import { UpdateExampleSwagger } from '../config/swagger/decorators/update-example-swagger.decorator';
import { UpdateExampleRequest } from '../dtos/update-example-request.dto';
import { UpdateExampleResponse } from '../dtos/update-example-response.dto';
import { ExampleUpdater } from '../services/example-updater.service';

const { globalRoute, putController } = examplesConfig;
const { context, routes, param } = putController.constants;
const { requestLog } = putController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class ExamplePutController {
	constructor(private readonly updater: ExampleUpdater) {}

	@UpdateExampleSwagger()
	@EndpointOwnerAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@HttpCode(HttpStatus.CREATED)
	@Put(routes.updateExample)
	async updateExample(
		@Param(param) id: string,
		@Body() request: UpdateExampleRequest,
	): Promise<UpdateExampleResponse> {
		logger.log(requestLog);

		return this.updater.run({ ...request, id });
	}
}
