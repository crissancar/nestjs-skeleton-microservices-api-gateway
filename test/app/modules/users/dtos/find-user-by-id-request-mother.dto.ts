import { FindUserByIdRequest } from '../../../../../src/app/modules/users/dtos/find-user-by-id-request.dto';
import { UuidMother } from '../../shared/mothers/uuid.mother';

export class FindUserByIdRequestMother {
	static create(id: string): FindUserByIdRequest {
		return { id };
	}

	static random(): FindUserByIdRequest {
		return this.create(UuidMother.random());
	}
}
