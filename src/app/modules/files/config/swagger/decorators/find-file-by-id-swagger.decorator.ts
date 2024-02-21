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
import { filesConfig } from '../../files.config';

const { swagger } = filesConfig;
const { security } = sharedConfigSwagger;

export const FindFileByIdSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.findById.operation),
		ApiSecurity(security.bearer),
		ApiParam(swagger.findById.param),
		ApiOkResponse(swagger.findById.response.ok),
		ApiBadRequestResponse(swagger.findById.response.badRequest),
	);
