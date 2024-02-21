import { Controller, Get, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags, OpenAPIObject } from '@nestjs/swagger';
import * as fs from 'fs';
import path from 'path';

import { config } from '../config/app/index';
import { FetchedDocument } from '../config/swagger/fetched-document.interface';
import { SwaggerConfig } from '../config/swagger/swagger.config';
import { ApiKeyAudiences } from './modules/api-keys/enums/api-key-audiences.enum';
import { sharedConfigSwagger } from './modules/shared/config/swagger/shared-config.swagger';
import { ApiKeyAuthentication } from './modules/shared/decorators/api-key-authentication.decorator';

const { project } = config;
const { security } = sharedConfigSwagger;

const logger = new Logger('AppController');

@Controller()
export class AppController {
	@ApiTags('Welcome')
	@ApiOperation({ summary: 'App welcome' })
	@ApiOkResponse({
		description: 'Welcome message',
	})
	@HttpCode(HttpStatus.OK)
	@Get()
	welcome(): object {
		logger.log(`Welcome to ${project.appName}`);

		return { welcome: project.appName };
	}

	@ApiTags('Swagger')
	@ApiOperation({ summary: 'Expose swagger file' })
	@ApiSecurity(security.apiKey)
	@ApiOkResponse({
		description: 'OpenAPI object',
	})
	@ApiKeyAuthentication(ApiKeyAudiences.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Get('swagger')
	getSwaggerFile(): FetchedDocument {
		logger.log('Request received to get swagger json');

		const swaggerPath = path.join(process.cwd(), 'artifacts/swagger', 'swagger.json');

		const file = fs.readFileSync(swaggerPath, 'utf-8');

		const swagger = JSON.parse(file) as OpenAPIObject;

		const redocOptions = SwaggerConfig.redocOptions();

		return { redocOptions, swagger };
	}
}
