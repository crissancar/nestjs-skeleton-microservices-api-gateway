import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { imagePropertiesSwagger } from '../config/swagger/properties/image-properties.swagger';

const { id } = imagePropertiesSwagger;

export class FindImageByIdRequest {
	@ApiProperty(id)
	@IsNotEmpty()
	@IsUUID()
	readonly id: string;
}
