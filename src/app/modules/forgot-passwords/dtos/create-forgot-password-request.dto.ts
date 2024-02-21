import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

import { forgotPasswordPropertiesSwagger } from '../config/swagger/properties/forgot-password-properties.swagger';

const { email } = forgotPasswordPropertiesSwagger;

export class CreateForgotPasswordRequest {
	@IsOptional()
	readonly id: string;

	@ApiProperty(email)
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;
}
