import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../shared/interfaces/http-exception-data.interface';

export class FetchExamplesException extends HttpException {
	constructor(context: string) {
		const message = 'Fetch users failed';
		const exceptionData = { context, message } as HTTPExceptionData;

		super(exceptionData, HttpStatus.BAD_REQUEST);
	}
}
