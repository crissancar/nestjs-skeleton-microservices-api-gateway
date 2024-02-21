import { ForgotPasswordEntity } from '../../../../../src/app/modules/forgot-passwords/persistence/forgot-password.entity';
import { UserEntity } from '../../../../../src/app/modules/users/persistence/user.entity';
import { UuidMother } from '../../shared/mothers/uuid.mother';

export class ForgotPasswordEntityMother {
	static create(id: string, user: UserEntity): ForgotPasswordEntity {
		return ForgotPasswordEntity.create(id, user);
	}

	static random(user: UserEntity): ForgotPasswordEntity {
		const id = UuidMother.random();

		return this.create(id, user);
	}
}
