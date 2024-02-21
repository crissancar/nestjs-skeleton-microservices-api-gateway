import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../../shared/interfaces/http-exception-data.interface';

export class FileWithIdNotExistsException extends HttpException {
	constructor(context: string, id: string) {
		const message = `File with id <${id}> not exists`;
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.NOT_FOUND);
	}
}
