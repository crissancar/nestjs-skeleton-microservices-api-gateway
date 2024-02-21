import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../shared/interfaces/http-exception-data.interface';

export class DeleteForgotPasswordException extends HttpException {
	constructor(context: string, id: string) {
		const message = `Delete forgot password <${id}> failed`;
		const exceptionData = { context, message } as HTTPExceptionData;

		super(exceptionData, HttpStatus.BAD_REQUEST);
	}
}
