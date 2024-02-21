import { UpdateUserForgotPasswordRequest } from '../../../../../src/app/modules/users/dtos/update-user-forgot-password-request.dto';
import { UserEntity } from '../../../../../src/app/modules/users/persistence/user.entity';
import { PasswordMother } from '../../shared/mothers/password.mother';

export class UpdateUserForgotPasswordRequestMother {
	static create(id: string, password: string): UpdateUserForgotPasswordRequest {
		return { id, password };
	}

	static random(user: UserEntity): UpdateUserForgotPasswordRequest {
		const { id } = user;

		return this.create(id, PasswordMother.random());
	}
}
