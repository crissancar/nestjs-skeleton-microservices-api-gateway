import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../shared/interfaces/http-exception-data.interface';

export class ExampleWithNameAlreadyExistsException extends HttpException {
	constructor(context: string, name: string) {
		const message = `Example with name <${name}> already exists`;
		const exceptionData = { context, message } as HTTPExceptionData;

		super(exceptionData, HttpStatus.NOT_FOUND);
	}
}
