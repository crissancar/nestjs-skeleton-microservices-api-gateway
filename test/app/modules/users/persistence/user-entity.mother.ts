import { UserAudiences } from '../../../../../src/app/modules/shared/enums/user-audiences.enum';
import { Bcrypt } from '../../../../../src/app/modules/shared/services/bcrypt.service';
import { CreateUserRequest } from '../../../../../src/app/modules/users/dtos/create-user-request.dto';
import { UserEntity } from '../../../../../src/app/modules/users/persistence/user.entity';
import { EmailMother } from '../../shared/mothers/email.mother';
import { FirstNameMother } from '../../shared/mothers/first-name.mother';
import { PasswordMother } from '../../shared/mothers/password.mother';
import { UuidMother } from '../../shared/mothers/uuid.mother';

export class UserEntityMother {
	static create(
		id: string,
		name: string,
		email: string,
		password: string,
		audiences?: Array<UserAudiences>,
	): UserEntity {
		return UserEntity.create(id, name, email, password, audiences);
	}

	static fromRequest(request: CreateUserRequest): UserEntity {
		const { id, name, email, password } = request;

		return this.create(id, name, email, password, [UserAudiences.GENERAL]);
	}

	static random(): UserEntity {
		const id = UuidMother.random();
		const name = FirstNameMother.random();
		const email = EmailMother.random();
		const password = Bcrypt.hash(PasswordMother.random());
		const audiences = [UserAudiences.GENERAL];

		return this.create(id, name, email, password, audiences);
	}
}
