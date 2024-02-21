import { ApiProperty } from '@nestjs/swagger';

import { filePropertiesSwagger } from '../config/swagger/properties/file-properties.swagger';

const { deleteMessage } = filePropertiesSwagger;

export class DeleteFileResponse {
	@ApiProperty(deleteMessage)
	readonly message: string;

	constructor(message: string) {
		this.message = message;
	}

	static create(id: string): DeleteFileResponse {
		const message = `File with id <${id}> deleted`;

		return new DeleteFileResponse(message);
	}
}
