import { Controller, Get, Param, Query } from '@nestjs/common';

import { EndpointAuthentication } from '../../shared/decorators/endpoint-authentication.decorator';
import { UserAudiences } from '../../shared/enums/user-audiences.enum';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { imagesConfig } from '../config/images.config';
import { FindImageByIdSwagger } from '../config/swagger/decorators/find-image-by-id-swagger.decorator';
import { FindImagesByCriteriaSwagger } from '../config/swagger/decorators/find-images-by-criteria-swagger.decorator';
import { FindImageByIdResponse } from '../dtos/find-image-by-id-response.dto';
import { FindImagesByCriteriaRequest } from '../dtos/find-images-by-criteria.request.dto';
import { FindImagesByCriteriaResponse } from '../dtos/find-images-by-criteria-response.dto';
import { ImageFinderById } from '../services/image-finder-by-id.service';
import { ImagesFinderByCriteria } from '../services/images-finder-by-criteria.service';

const { globalRoute, getController } = imagesConfig;
const { context, routes, params } = getController.constants;
const { findById, findByCriteria } = getController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class ImageGetController {
	constructor(
		private readonly finderById: ImageFinderById,
		private readonly finderByCriteria: ImagesFinderByCriteria,
	) {}

	@FindImageByIdSwagger()
	@EndpointAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@Get(routes.findById)
	async findById(@Param(params.id) id: string): Promise<FindImageByIdResponse> {
		logger.log(findById.requestLog);

		return this.finderById.run({ id });
	}

	@FindImagesByCriteriaSwagger()
	@EndpointAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@Get()
	async findByCriteria(
		@Query() request: FindImagesByCriteriaRequest,
	): Promise<FindImagesByCriteriaResponse> {
		logger.log(findByCriteria.requestLog);

		return this.finderByCriteria.run(request);
	}
}
