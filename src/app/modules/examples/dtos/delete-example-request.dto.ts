import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { examplePropertiesSwagger } from '../config/swagger/properties/example-properties.swagger';

const { id } = examplePropertiesSwagger;

export class DeleteExampleRequest {
	@ApiProperty(id)
	@IsNotEmpty()
	@IsUUID()
	readonly id: string;
}
