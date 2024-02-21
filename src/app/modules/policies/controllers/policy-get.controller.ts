import { Controller, Get, Query } from '@nestjs/common';

import { ApiKeyAudiences } from '../../api-keys/enums/api-key-audiences.enum';
import { ApiKeyAuthentication } from '../../shared/decorators/api-key-authentication.decorator';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { policiesConfig } from '../config/policies.config';
import { FindPoliciesByCriteriaSwagger } from '../config/swagger/decorators/find-policies-by-criteria-swagger.decorator';
import { FindPoliciesByCriteriaRequest } from '../dto/find-policies-by-criteria.request.dto';
import { FindPoliciesByCriteriaResponse } from '../dto/find-policies-by-criteria-response.dto';
import { PoliciesFinderByCriteria } from '../services/policies-finder-by-criteria.service';

const { globalRoute, getController } = policiesConfig;
const { context } = getController.constants;
const { findByCriteria } = getController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class PolicyGetController {
	constructor(private readonly finder: PoliciesFinderByCriteria) {}

	@FindPoliciesByCriteriaSwagger()
	// @ApiKeyAuthentication(ApiKeyAudiences.ADMIN, ApiKeyAudiences.GENERAL)
	@Get()
	async run(
		@Query() request: FindPoliciesByCriteriaRequest,
	): Promise<FindPoliciesByCriteriaResponse> {
		logger.log(findByCriteria.requestLog);

		return this.finder.run(request);
	}
}
