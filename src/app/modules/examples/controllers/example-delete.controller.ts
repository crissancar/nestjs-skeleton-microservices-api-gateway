import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';

import { EndpointOwnerAuthentication } from '../../shared/decorators/endpoint-owner-authentication.decorator';
import { UserAudiences } from '../../shared/enums/user-audiences.enum';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { examplesConfig } from '../config/examples.config';
import { DeleteExampleSwagger } from '../config/swagger/decorators/delete-example-swagger.decorator';
import { SoftDeleteExampleSwagger } from '../config/swagger/decorators/soft-delete-example-swagger.decorator';
import { DeleteExampleResponse } from '../dtos/delete-example-response.dto';
import { SoftDeleteExampleResponse } from '../dtos/soft-delete-example-response.dto';
import { ExampleDeleter } from '../services/example-deleter.service';
import { ExampleSoftDeleter } from '../services/example-soft-deleter.service';

const { globalRoute, deleteController } = examplesConfig;
const { context, routes, params } = deleteController.constants;
const { softDelete, deleteExample } = deleteController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class ExampleDeleteController {
	constructor(
		private readonly deleter: ExampleDeleter,
		private readonly softDeleter: ExampleSoftDeleter,
	) {}

	@DeleteExampleSwagger()
	@EndpointOwnerAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@HttpCode(HttpStatus.OK)
	@Delete(routes.delete)
	async delete(@Param(params.id) id: string): Promise<DeleteExampleResponse> {
		logger.log(deleteExample.requestLog);

		return this.deleter.run({ id });
	}

	@SoftDeleteExampleSwagger()
	@EndpointOwnerAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@HttpCode(HttpStatus.OK)
	@Delete(routes.softDelete)
	async softDelete(@Param(params.id) id: string): Promise<SoftDeleteExampleResponse> {
		logger.log(softDelete.requestLog);

		return this.softDeleter.run({ id });
	}
}
