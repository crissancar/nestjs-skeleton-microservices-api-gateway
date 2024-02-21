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
import { faqsConfig } from '../../faqs.config';

const { swagger } = faqsConfig;
const { security } = sharedConfigSwagger;

export const FindFAQsByCriteriaSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.findByCriteria.operation),
		ApiSecurity(security.bearer),
		ApiQuery(swagger.findByCriteria.query.language),
		ApiOkResponse(swagger.findByCriteria.response.ok),
		ApiNotFoundResponse(swagger.findByCriteria.response.badRequest),
	);
