import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../shared/interfaces/http-exception-data.interface';

export class ForgotPasswordFailedException extends HttpException {
	constructor(context: string) {
		const message = 'Forgot password failed';
		const exceptionData = { context, message } as HTTPExceptionData;

		super(exceptionData, HttpStatus.BAD_REQUEST);
	}
}
