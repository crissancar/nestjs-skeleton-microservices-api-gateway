import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

import { examplePropertiesSwagger } from '../config/swagger/properties/example-properties.swagger';

const { name } = examplePropertiesSwagger;

export class CreateExampleRequest {
	@IsEmpty()
	readonly id: string;

	@ApiProperty(name)
	@IsNotEmpty()
	@IsString()
	readonly name: string;
}
