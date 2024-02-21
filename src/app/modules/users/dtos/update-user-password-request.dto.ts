import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

import { AuthenticatedUser } from '../../auth/dtos/authenticated-user.dto';
import { userPropertiesSwagger } from '../config/swagger/properties/user-properties.swagger';

const { password } = userPropertiesSwagger;

export class UpdateUserPasswordRequest {
	@IsOptional()
	readonly id: string;

	@IsOptional()
	readonly authUser: AuthenticatedUser;

	@ApiProperty(password)
	@IsNotEmpty()
	@IsString()
	readonly oldPassword: string;

	@ApiProperty(password)
	@IsNotEmpty()
	@IsString()
	@Length(8)
	readonly password: string;
}
