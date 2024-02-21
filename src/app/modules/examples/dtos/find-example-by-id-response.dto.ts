import { ApiProperty } from '@nestjs/swagger';

import { examplePropertiesSwagger } from '../config/swagger/properties/example-properties.swagger';
import { ExampleEntity } from '../persistence/example.entity';

const { id, name } = examplePropertiesSwagger;

export class FindExampleByIdResponse {
	@ApiProperty(id)
	readonly id: string;

	@ApiProperty(name)
	readonly name: string;

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}

	static create(foundExample: ExampleEntity): FindExampleByIdResponse {
		const { id, name } = foundExample;

		return new FindExampleByIdResponse(id, name);
	}
}
