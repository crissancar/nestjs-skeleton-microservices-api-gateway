import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../shared/interfaces/http-exception-data.interface';

export class CreateImageThumbnailsException extends HttpException {
	constructor(context: string) {
		const message = 'Create image thumbnails failed';
		const exceptionData = { context, message } as HTTPExceptionData;

		super(exceptionData, HttpStatus.BAD_REQUEST);
	}
}
