import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from './../../shared/interfaces/http-exception-data.interface';

export class ExpiredForgotPasswordException extends HttpException {
	constructor(context: string, id: string) {
		const message = `Forgot password <${id}> expired`;
		const exceptionData = { context, message } as HTTPExceptionData;

		super(exceptionData, HttpStatus.FORBIDDEN);
	}
}
