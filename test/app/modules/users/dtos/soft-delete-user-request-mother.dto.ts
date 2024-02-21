import { SoftDeleteUserRequest } from '../../../../../src/app/modules/users/dtos/soft-delete-user-request.dto';
import { UuidMother } from '../../shared/mothers/uuid.mother';

export class SoftDeleteUserRequestMother {
	static create(id: string): SoftDeleteUserRequest {
		return { id };
	}

	static random(): SoftDeleteUserRequest {
		return this.create(UuidMother.random());
	}
}
