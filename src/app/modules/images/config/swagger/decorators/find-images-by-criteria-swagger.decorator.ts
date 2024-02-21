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
import { imagesConfig } from '../../images.config';

const { swagger } = imagesConfig;
const { security } = sharedConfigSwagger;

export const FindImagesByCriteriaSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.findByCriteria.operation),
		ApiSecurity(security.bearer),
		ApiQuery(swagger.findByCriteria.query.name),
		ApiOkResponse(swagger.findByCriteria.response.ok),
		ApiNotFoundResponse(swagger.findByCriteria.response.badRequest),
	);
