import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../shared/interfaces/http-exception-data.interface';

export class SendCreatedForgotPasswordMailException extends HttpException {
	constructor(context: string, id: string) {
		const message = `Send mail to forgot password <${id}> failed`;
		const exceptionData = { context, message } as HTTPExceptionData;

		super(exceptionData, HttpStatus.BAD_REQUEST);
	}
}
