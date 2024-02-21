import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { sharedConfigSwagger } from '../../../../shared/config/swagger/shared-config.swagger';
import { usersConfig } from '../../users.config';

const { swagger } = usersConfig;
const { security } = sharedConfigSwagger;

export const FindUserByIdSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.findById.operation),
		ApiSecurity(security.bearer),
		ApiParam(swagger.findById.param),
		ApiResponse(swagger.findById.response.ok),
		ApiResponse(swagger.findById.response.badRequest),
	);
