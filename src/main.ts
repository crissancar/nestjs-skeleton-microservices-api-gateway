import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import SendGrid from '@sendgrid/mail';
import * as Sentry from '@sentry/node';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import responseTime from 'response-time';

import { AppModule } from './app/app.module';
import { config } from './config/app/index';
import { WelcomeLogs } from './config/logger/welcome-logs.config';
import { SentryConfig } from './config/sentry/sentry.config';
import { SwaggerConfig } from './config/swagger/swagger.config';

const { sentry, sendgrid, api } = config;

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);

	// Set Sentry
	if (sentry.enabled) {
		setSentry(app);
	}

	// Set Swagger
	if (api.documentation.enabled) {
		setSwagger(app);
	}

	// Set Sendgrid
	if (sendgrid.enabled) {
		setSendgrid();
	}

	// Set Pino logger
	app.useLogger(app.get(Logger));

	// Set global prefix
	app.setGlobalPrefix(api.version);

	// Set Cors
	app.enableCors(api.cors);

	// Compress all responses
	app.use(compression());

	// Set Helmet
	app.use(helmet(api.helmet));

	// Set Rate Limit
	app.use(rateLimit(api.rateLimit));

	// ResponseTime
	if (api.responseTime) {
		app.use(responseTime());
	}

	// Launch the app
	await app.listen(api.port);

	// Welcome logs
	WelcomeLogs.run();
}

function setSwagger(app: INestApplication): void {
	const config = SwaggerConfig.documentBuilder();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerConfig.saveDocument(document);

	if (!api.documentation.redoc) {
		const path = SwaggerConfig.path();
		const customOptions = SwaggerConfig.customOptions();

		SwaggerModule.setup(path, app, document, customOptions);
	}
}

function setSentry(app: INestApplication): void {
	const options = SentryConfig.run();

	Sentry.init(options);

	app.use(Sentry.Handlers.requestHandler());
}

function setSendgrid(): void {
	SendGrid.setApiKey(sendgrid.apiKey);
}

void bootstrap();
