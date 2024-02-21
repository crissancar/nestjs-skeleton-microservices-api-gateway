import { applyDecorators } from '@nestjs/common';
import {
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiSecurity,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { sharedConfigSwagger } from '../../../../shared/config/swagger/shared-config.swagger';
import { authConfig } from '../../auth.config';

const { swagger } = authConfig;
const { security } = sharedConfigSwagger;

export const LoginSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.login.operation),
		ApiSecurity(security.apiKey),
		ApiBody(swagger.login.body),
		ApiOkResponse(swagger.login.response.ok),
		ApiUnauthorizedResponse(swagger.login.response.unauthorized),
	);
