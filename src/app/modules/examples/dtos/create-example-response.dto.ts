import { ApiProperty } from '@nestjs/swagger';

import { examplePropertiesSwagger } from '../config/swagger/properties/example-properties.swagger';
import { ExampleEntity } from '../persistence/example.entity';

const { id, name } = examplePropertiesSwagger;

export class CreateExampleResponse {
	@ApiProperty(id)
	readonly id: string;

	@ApiProperty(name)
	readonly name: string;

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}

	static create(createdExample: ExampleEntity): CreateExampleResponse {
		const { id, name } = createdExample;

		return new CreateExampleResponse(id, name);
	}
}
