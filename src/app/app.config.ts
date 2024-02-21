import { Provider, ValidationError, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { config } from '../config/app';
import { ExceptionsFilter } from '../config/filters/exceptions.filter';
import { TransformInterceptor } from '../config/interceptors/transform.interceptor';
import { SentryInterceptor } from '../config/sentry/sentry.interceptor';
import { ValidationException } from './modules/shared/exceptions/validation.exception';
import { BlacklistIPGuard } from './modules/shared/guards/blacklist-ip.guard';
import { SignatureGuard } from './modules/shared/guards/signature.guard';

export const providersConfig: Array<Provider> = [
	{
		provide: APP_INTERCEPTOR,
		useFactory: () => new SentryInterceptor(),
	},
	{
		provide: APP_INTERCEPTOR,
		useFactory: () => new TransformInterceptor(),
	},
	{
		provide: APP_FILTER,
		useFactory: () => new ExceptionsFilter(),
	},
	{
		provide: APP_GUARD,
		useClass: BlacklistIPGuard,
	},
	{
		provide: APP_PIPE,
		useFactory: () =>
			new ValidationPipe({
				exceptionFactory: (errors: ValidationError[]) => new ValidationException(errors),
				whitelist: true,
			}),
	},
	...(config.client.signature.enabled
		? [
				{
					provide: APP_GUARD,
					useClass: SignatureGuard,
				},
		  ]
		: []),
];
