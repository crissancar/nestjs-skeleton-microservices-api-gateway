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
import { usersConfig } from '../../users.config';

const { swagger } = usersConfig;
const { security } = sharedConfigSwagger;

export const FindUsersByCriteriaSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.findByCriteria.operation),
		ApiSecurity(security.bearer),
		ApiQuery(swagger.findByCriteria.query.name),
		ApiQuery(swagger.findByCriteria.query.email),
		ApiOkResponse(swagger.findByCriteria.response.ok),
		ApiNotFoundResponse(swagger.findByCriteria.response.badRequest),
	);
