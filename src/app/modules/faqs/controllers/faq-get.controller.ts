import { Controller, Get, Query } from '@nestjs/common';

import { EndpointAuthentication } from '../../shared/decorators/endpoint-authentication.decorator';
import { UserAudiences } from '../../shared/enums/user-audiences.enum';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { faqsConfig } from '../config/faqs.config';
import { FindFAQsByCriteriaSwagger } from '../config/swagger/decorators/find-faqs-by-criteria-swagger.decorator';
import { FindFAQsByCriteriaRequest } from '../dtos/find-faqs-by-criteria.request.dto';
import { FindFAQsByCriteriaResponse } from '../dtos/find-faqs-by-criteria-response.dto';
import { FAQsFinderByCriteria } from '../services/faqs-finder-by-criteria.service';

const { globalRoute, getController } = faqsConfig;
const { context } = getController.constants;
const { findByCriteria } = getController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class FAQGetController {
	constructor(private readonly finderByCriteria: FAQsFinderByCriteria) {}

	@FindFAQsByCriteriaSwagger()
	@EndpointAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@Get()
	async findByCriteria(
		@Query() request: FindFAQsByCriteriaRequest,
	): Promise<FindFAQsByCriteriaResponse> {
		logger.log(findByCriteria.requestLog);

		return this.finderByCriteria.run(request);
	}
}
