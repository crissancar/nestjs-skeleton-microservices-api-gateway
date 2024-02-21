import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { sharedConfigSwagger } from '../../../../shared/config/swagger/shared-config.swagger';
import { examplesConfig } from '../../examples.config';

const { swagger } = examplesConfig;
const { security } = sharedConfigSwagger;

export const CreateExampleSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.create.operation),
		ApiSecurity(security.apiKey),
		ApiBody(swagger.create.body),
		ApiResponse(swagger.create.response.created),
		ApiResponse(swagger.create.response.badRequest),
	);
