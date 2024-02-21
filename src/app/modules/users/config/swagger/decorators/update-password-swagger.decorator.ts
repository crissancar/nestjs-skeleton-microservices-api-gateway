import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiOperation,
	ApiParam,
	ApiSecurity,
	ApiTags,
} from '@nestjs/swagger';

import { sharedConfigSwagger } from '../../../../shared/config/swagger/shared-config.swagger';
import { usersConfig } from '../../users.config';

const { swagger } = usersConfig;
const { security } = sharedConfigSwagger;

export const UpdateUserPasswordSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.updateUserPassword.operation),
		ApiSecurity(security.bearer),
		ApiParam(swagger.updateUserPassword.param),
		ApiCreatedResponse(swagger.updateUserPassword.response.created),
		ApiBadRequestResponse(swagger.updateUserPassword.response.badRequest),
	);
