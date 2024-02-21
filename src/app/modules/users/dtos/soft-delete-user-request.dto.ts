import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { userPropertiesSwagger } from '../config/swagger/properties/user-properties.swagger';

const { id } = userPropertiesSwagger;

export class SoftDeleteUserRequest {
	@ApiProperty(id)
	@IsNotEmpty()
	@IsUUID()
	readonly id: string;
}
