import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { sharedPropertiesSwagger } from '../../shared/config/swagger/shared-properties.swagger';

const { id } = sharedPropertiesSwagger;

export class FindForgotPasswordRequest {
	@ApiProperty(id)
	@IsNotEmpty()
	@IsString()
	readonly id: string;

	constructor(id: string) {
		this.id = id;
	}

	static create(id: string): FindForgotPasswordRequest {
		return new FindForgotPasswordRequest(id);
	}
}
