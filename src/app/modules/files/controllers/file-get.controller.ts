import { Controller, Get, Param, Query } from '@nestjs/common';

import { EndpointAuthentication } from '../../shared/decorators/endpoint-authentication.decorator';
import { UserAudiences } from '../../shared/enums/user-audiences.enum';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { filesConfig } from '../config/files.config';
import { FindFileByIdSwagger } from '../config/swagger/decorators/find-file-by-id-swagger.decorator';
import { FindFilesByCriteriaSwagger } from '../config/swagger/decorators/find-files-by-criteria-swagger.decorator';
import { FindFileByIdResponse } from '../dtos/find-file-by-id-response.dto';
import { FindFilesByCriteriaRequest } from '../dtos/find-files-by-criteria.request.dto';
import { FindFilesByCriteriaResponse } from '../dtos/find-files-by-criteria-response.dto';
import { FileFinderById } from '../services/file-finder-by-id.service';
import { FilesFinderByCriteria } from '../services/files-finder-by-criteria.service';

const { globalRoute, getController } = filesConfig;
const { context, routes, params } = getController.constants;
const { findById, findByCriteria } = getController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class FileGetController {
	constructor(
		private readonly finderById: FileFinderById,
		private readonly finderByCriteria: FilesFinderByCriteria,
	) {}

	@FindFileByIdSwagger()
	@EndpointAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@Get(routes.findById)
	async findById(@Param(params.id) id: string): Promise<FindFileByIdResponse> {
		logger.log(findById.requestLog);

		return this.finderById.run({ id });
	}

	@FindFilesByCriteriaSwagger()
	@EndpointAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@Get()
	async findByCriteria(
		@Query() request: FindFilesByCriteriaRequest,
	): Promise<FindFilesByCriteriaResponse> {
		logger.log(findByCriteria.requestLog);

		return this.finderByCriteria.run(request);
	}
}
