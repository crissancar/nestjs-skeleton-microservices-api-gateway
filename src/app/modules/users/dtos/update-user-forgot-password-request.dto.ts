import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsStrongPassword, Length } from 'class-validator';

import { userPropertiesSwagger } from '../config/swagger/properties/user-properties.swagger';

const { password } = userPropertiesSwagger;

export class UpdateUserForgotPasswordRequest {
	@IsEmpty()
	readonly id: string;

	@ApiProperty(password)
	@IsNotEmpty()
	@IsStrongPassword()
	@Length(8)
	readonly password: string;
}
