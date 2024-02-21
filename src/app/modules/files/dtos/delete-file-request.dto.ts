import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { filePropertiesSwagger } from '../config/swagger/properties/file-properties.swagger';

const { id } = filePropertiesSwagger;

export class DeleteFileRequest {
	@ApiProperty(id)
	@IsNotEmpty()
	@IsUUID()
	readonly id: string;
}
