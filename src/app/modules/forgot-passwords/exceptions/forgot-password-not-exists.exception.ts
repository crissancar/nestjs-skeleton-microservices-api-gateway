import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../shared/interfaces/http-exception-data.interface';

export class ForgotPasswordNotExistsException extends HttpException {
	constructor(context: string, id: string) {
		const message = `Forgot password <${id}> not exists`;
		const exceptionData = { context, message } as HTTPExceptionData;

		super(exceptionData, HttpStatus.BAD_REQUEST);
	}
}
