import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiConsumes,
	ApiOkResponse,
	ApiOperation,
	ApiSecurity,
	ApiTags,
} from '@nestjs/swagger';

import { sharedConfigSwagger } from '../../../../shared/config/swagger/shared-config.swagger';
import { imagesConfig } from '../../images.config';

const { swagger } = imagesConfig;
const { security } = sharedConfigSwagger;

export const CreateImageSwagger = (): MethodDecorator =>
	applyDecorators(
		ApiTags(swagger.tag),
		ApiOperation(swagger.create.operation),
		ApiSecurity(security.bearer),
		ApiConsumes('multipart/form-data'),
		ApiOkResponse(swagger.create.response.ok),
		ApiBadRequestResponse(swagger.create.response.badRequest),
	);
