import { applyDecorators } from '@nestjs/common';
import {
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiQuery,
	ApiSecurity,
	ApiTags,
} from '@nestjs/swagger';

import { sharedConfigSwagger } from '../../../../shared/config/swagger/shared-config.swagger';
import { policiesConfig } from '../../policies.config';

const { swagger } = policiesConfig;
const { security } = sharedConfigSwagger;

export const FindPoliciesByCriteriaSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.findByCriteria.operation),
		ApiSecurity(security.apiKey),
		ApiQuery(swagger.findByCriteria.query.type),
		ApiQuery(swagger.findByCriteria.query.language),
		ApiOkResponse(swagger.findByCriteria.response.ok),
		ApiNotFoundResponse(swagger.findByCriteria.response.badRequest),
	);
