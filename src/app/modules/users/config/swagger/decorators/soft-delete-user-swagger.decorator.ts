import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiSecurity,
	ApiTags,
} from '@nestjs/swagger';

import { sharedConfigSwagger } from '../../../../shared/config/swagger/shared-config.swagger';
import { usersConfig } from '../../users.config';

const { swagger } = usersConfig;
const { security } = sharedConfigSwagger;

export const SoftDeleteUserSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.softDelete.operation),
		ApiSecurity(security.bearer),
		ApiParam(swagger.softDelete.param),
		ApiOkResponse(swagger.softDelete.response.ok),
		ApiBadRequestResponse(swagger.softDelete.response.badRequest),
	);
