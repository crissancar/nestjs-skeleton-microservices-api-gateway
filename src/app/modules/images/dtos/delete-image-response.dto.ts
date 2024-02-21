import { ApiProperty } from '@nestjs/swagger';

import { imagePropertiesSwagger } from '../config/swagger/properties/image-properties.swagger';

const { deleteMessage } = imagePropertiesSwagger;

export class DeleteImageResponse {
	@ApiProperty(deleteMessage)
	readonly message: string;

	constructor(message: string) {
		this.message = message;
	}

	static create(id: string): DeleteImageResponse {
		const message = `Image with id <${id}> deleted`;

		return new DeleteImageResponse(message);
	}
}
