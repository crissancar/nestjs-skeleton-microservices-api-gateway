import { UpdateUserRequest } from '../../../../../src/app/modules/users/dtos/update-user-request.dto';
import { EmailMother } from '../../shared/mothers/email.mother';
import { FirstNameMother } from '../../shared/mothers/first-name.mother';

export class UpdateUserRequestMother {
	static create(id: string, name: string, email: string): UpdateUserRequest {
		return { id, name, email };
	}

	static random(id: string): UpdateUserRequest {
		return this.create(id, FirstNameMother.random(), EmailMother.random());
	}
}
