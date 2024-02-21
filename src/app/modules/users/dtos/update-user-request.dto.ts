import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

import { userPropertiesSwagger } from '../config/swagger/properties/user-properties.swagger';

const { name, email } = userPropertiesSwagger;

export class UpdateUserRequest {
	@IsOptional()
	readonly id: string;

	@ApiProperty({ ...name, required: false })
	@IsOptional()
	@IsString()
	readonly name?: string;

	@ApiProperty({ ...email, required: false })
	@IsOptional()
	@IsEmail()
	readonly email?: string;
}
