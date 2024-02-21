import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../shared/interfaces/http-exception-data.interface';

export class InvalidImageMimeTypeException extends HttpException {
	constructor(context: string) {
		const message = 'Invalid image mime type';
		const exceptionData = { context, message } as HTTPExceptionData;

		super(exceptionData, HttpStatus.BAD_REQUEST);
	}
}
