import { DeleteUserRequest } from '../../../../../src/app/modules/users/dtos/delete-user-request.dto';
import { UuidMother } from '../../shared/mothers/uuid.mother';

export class DeleteUserRequestMother {
	static create(id: string): DeleteUserRequest {
		return { id };
	}

	static random(): DeleteUserRequest {
		return this.create(UuidMother.random());
	}
}
