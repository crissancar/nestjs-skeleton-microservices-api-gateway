import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

import { forgotPasswordPropertiesSwagger } from '../config/swagger/properties/forgot-password-properties.swagger';

const { password } = forgotPasswordPropertiesSwagger;

export class CompleteForgotPasswordRequest {
	@IsOptional()
	readonly id: string;

	@ApiProperty(password)
	@IsNotEmpty()
	@IsString()
	@Length(8)
	readonly password: string;
}
