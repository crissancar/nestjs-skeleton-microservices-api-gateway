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
import { forgotPasswordsConfig } from '../../forgot-passwords.config';

const { swagger } = forgotPasswordsConfig;
const { security } = sharedConfigSwagger;

export const CompleteForgotPasswordSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.completeForgotPassword.operation),
		ApiSecurity(security.bearer),
		ApiParam(swagger.completeForgotPassword.param),
		ApiOkResponse(swagger.completeForgotPassword.response.ok),
		ApiBadRequestResponse(swagger.completeForgotPassword.response.badRequest),
	);
