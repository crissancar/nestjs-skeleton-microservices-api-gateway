import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { filePropertiesSwagger } from '../config/swagger/properties/file-properties.swagger';

const { id } = filePropertiesSwagger;

export class FindFileByIdRequest {
	@ApiProperty(id)
	@IsNotEmpty()
	@IsUUID()
	readonly id: string;
}
