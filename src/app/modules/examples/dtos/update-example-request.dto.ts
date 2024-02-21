import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsOptional, IsString } from 'class-validator';

import { examplePropertiesSwagger } from '../config/swagger/properties/example-properties.swagger';

const { name } = examplePropertiesSwagger;

export class UpdateExampleRequest {
	@IsEmpty()
	readonly id: string;

	@ApiProperty({ ...name, required: false })
	@IsOptional()
	@IsString()
	readonly name?: string;
}
