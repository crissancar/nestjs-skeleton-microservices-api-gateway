import { AuthenticatedUser } from '../../../../../src/app/modules/auth/dtos/authenticated-user.dto';
import { UpdateUserPasswordRequest } from '../../../../../src/app/modules/users/dtos/update-user-password-request.dto';
import { UserEntity } from '../../../../../src/app/modules/users/persistence/user.entity';
import { PasswordMother } from '../../shared/mothers/password.mother';

export class UpdateUserPasswordRequestMother {
	static create(
		id: string,
		authUser: AuthenticatedUser,
		oldPassword: string,
		password: string,
	): UpdateUserPasswordRequest {
		return { id, authUser, oldPassword, password };
	}

	static random(user: UserEntity, oldPassword: string): UpdateUserPasswordRequest {
		const { id } = user;

		return this.create(id, user, oldPassword, PasswordMother.random());
	}
}
