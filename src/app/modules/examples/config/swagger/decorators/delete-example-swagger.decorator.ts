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
import { examplesConfig } from '../../examples.config';

const { swagger } = examplesConfig;
const { security } = sharedConfigSwagger;

export const DeleteExampleSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.delete.operation),
		ApiSecurity(security.bearer),
		ApiParam(swagger.delete.param),
		ApiOkResponse(swagger.delete.response.ok),
		ApiBadRequestResponse(swagger.delete.response.badRequest),
	);
