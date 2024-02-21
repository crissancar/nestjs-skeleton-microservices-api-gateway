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
import { examplesConfig } from '../../examples.config';

const { swagger } = examplesConfig;
const { security } = sharedConfigSwagger;

export const UpdateExampleSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.update.operation),
		ApiSecurity(security.bearer),
		ApiParam(swagger.update.param),
		ApiCreatedResponse(swagger.update.response.created),
		ApiBadRequestResponse(swagger.update.response.badRequest),
	);
