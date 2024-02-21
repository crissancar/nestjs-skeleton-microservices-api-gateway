import { OpenAPIObject } from '@nestjs/swagger';

import { RedocOptions } from './redoc-options.interface';

export interface FetchedDocument {
	redocOptions: RedocOptions;
	swagger: OpenAPIObject;
}
