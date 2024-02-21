import { ApiProperty } from '@nestjs/swagger';

import { examplePropertiesSwagger } from '../config/swagger/properties/example-properties.swagger';

const { deletedMessage } = examplePropertiesSwagger;

export class DeleteExampleResponse {
	@ApiProperty(deletedMessage)
	readonly message: string;

	constructor(message: string) {
		this.message = message;
	}

	static create(id: string): DeleteExampleResponse {
		const message = `Example with id <${id}> deleted`;

		return new DeleteExampleResponse(message);
	}
}
