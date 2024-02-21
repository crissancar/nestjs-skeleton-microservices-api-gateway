import { Controller, Get, Param, Query } from '@nestjs/common';

import { EndpointAuthentication } from '../../shared/decorators/endpoint-authentication.decorator';
import { EndpointOwnerAuthentication } from '../../shared/decorators/endpoint-owner-authentication.decorator';
import { UserAudiences } from '../../shared/enums/user-audiences.enum';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { examplesConfig } from '../config/examples.config';
import { FindExampleByIdSwagger } from '../config/swagger/decorators/find-example-by-id-swagger.decorator';
import { FindExamplesByCriteriaSwagger } from '../config/swagger/decorators/find-examples-by-criteria-swagger.decorator';
import { FindExampleByIdResponse } from '../dtos/find-example-by-id-response.dto';
import { FindExamplesByCriteriaRequest } from '../dtos/find-examples-by-criteria.request.dto';
import { FindExamplesByCriteriaResponse } from '../dtos/find-examples-by-criteria-response.dto';
import { ExampleFinderById } from '../services/example-finder-by-id.service';
import { ExamplesFinderByCriteria } from '../services/examples-finder-by-criteria.service';

const { globalRoute, getController } = examplesConfig;
const { context, routes, params } = getController.constants;
const { find, findByCriteria } = getController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class ExampleGetController {
	constructor(
		private readonly finderById: ExampleFinderById,
		private readonly finderByCriteria: ExamplesFinderByCriteria,
	) {}

	@FindExampleByIdSwagger()
	@EndpointOwnerAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@Get(routes.find)
	async findById(@Param(params.id) id: string): Promise<FindExampleByIdResponse> {
		logger.log(find.requestLog);

		return await this.finderById.run({ id });
	}

	@FindExamplesByCriteriaSwagger()
	@EndpointAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@Get()
	async findByCriteria(
		@Query() request: FindExamplesByCriteriaRequest,
	): Promise<FindExamplesByCriteriaResponse> {
		logger.log(findByCriteria.requestLog);

		return this.finderByCriteria.run(request);
	}
}
