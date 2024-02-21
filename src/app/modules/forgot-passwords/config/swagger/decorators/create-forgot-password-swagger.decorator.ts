import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiOkResponse,
	ApiOperation,
	ApiSecurity,
	ApiTags,
} from '@nestjs/swagger';

import { sharedConfigSwagger } from '../../../../shared/config/swagger/shared-config.swagger';
import { forgotPasswordsConfig } from '../../forgot-passwords.config';

const { swagger } = forgotPasswordsConfig;
const { security } = sharedConfigSwagger;

export const CreateForgotPasswordSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.createForgotPassword.operation),
		ApiSecurity(security.bearer),
		ApiOkResponse(swagger.createForgotPassword.response.ok),
		ApiBadRequestResponse(swagger.createForgotPassword.response.badRequest),
	);
