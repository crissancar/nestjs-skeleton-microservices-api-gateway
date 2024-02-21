import { ApiProperty } from '@nestjs/swagger';

import { sharedPropertiesSwagger } from '../../shared/config/swagger/shared-properties.swagger';
import { sharedRelationsSwagger } from '../../shared/config/swagger/shared-relations.swagger';
import { UserEntity } from '../../users/persistence/user.entity';
import { ForgotPasswordEntity } from '../persistence/forgot-password.entity';

const { id } = sharedPropertiesSwagger;
const { user } = sharedRelationsSwagger;

export class CreateForgotPasswordResponse {
	@ApiProperty(id)
	readonly id: string;

	@ApiProperty(user)
	readonly user: UserEntity;

	constructor(id: string, user: UserEntity) {
		this.id = id;
		this.user = user;
	}

	static create(forgotPassword: ForgotPasswordEntity): CreateForgotPasswordResponse {
		const { id, user } = forgotPassword;

		return new CreateForgotPasswordResponse(id, user);
	}
}
