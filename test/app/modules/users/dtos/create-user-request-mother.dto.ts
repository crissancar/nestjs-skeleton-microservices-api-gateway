import { CreateUserRequest } from '../../../../../src/app/modules/users/dtos/create-user-request.dto';
import { EmailMother } from '../../shared/mothers/email.mother';
import { FirstNameMother } from '../../shared/mothers/first-name.mother';
import { PasswordMother } from '../../shared/mothers/password.mother';
import { UuidMother } from '../../shared/mothers/uuid.mother';

export class CreateUserRequestMother {
	static create(id: string, name: string, email: string, password: string): CreateUserRequest {
		return { id, name, email, password };
	}

	static random(): CreateUserRequest {
		return this.create(
			UuidMother.random(),
			FirstNameMother.random(),
			EmailMother.random(),
			PasswordMother.random(),
		);
	}
}
