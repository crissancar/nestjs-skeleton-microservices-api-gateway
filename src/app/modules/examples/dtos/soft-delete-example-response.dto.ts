import { ApiProperty } from '@nestjs/swagger';

import { examplePropertiesSwagger } from '../config/swagger/properties/example-properties.swagger';

const { softDeletedMessage } = examplePropertiesSwagger;

export class SoftDeleteExampleResponse {
	@ApiProperty(softDeletedMessage)
	readonly message: string;

	constructor(message: string) {
		this.message = message;
	}

	static create(id: string): SoftDeleteExampleResponse {
		const message = `Example with id <${id}> soft deleted`;

		return new SoftDeleteExampleResponse(message);
	}
}
