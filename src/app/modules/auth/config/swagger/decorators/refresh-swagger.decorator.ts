import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiOkResponse,
	ApiOperation,
	ApiSecurity,
	ApiTags,
} from '@nestjs/swagger';

import { sharedConfigSwagger } from '../../../../shared/config/swagger/shared-config.swagger';
import { authConfig } from '../../auth.config';

const { swagger } = authConfig;
const { security } = sharedConfigSwagger;

export const RefreshTokenSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.refreshToken.operation),
		ApiSecurity(security.bearer),
		ApiOkResponse(swagger.refreshToken.response.ok),
		ApiBadRequestResponse(swagger.refreshToken.response.badRequest),
	);
