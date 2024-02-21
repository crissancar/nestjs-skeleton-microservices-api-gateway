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

export const SoftDeleteExampleSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.softDelete.operation),
		ApiSecurity(security.bearer),
		ApiParam(swagger.softDelete.param),
		ApiOkResponse(swagger.softDelete.response.ok),
		ApiBadRequestResponse(swagger.softDelete.response.badRequest),
	);
