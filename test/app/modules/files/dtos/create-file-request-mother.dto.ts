import { CreateFileRequest } from '../../../../../src/app/modules/files/dtos/create-file-request.dto';
import { UserEntity } from '../../../../../src/app/modules/users/persistence/user.entity';
import { UuidMother } from '../../shared/mothers/uuid.mother';
import { WordMother } from '../../shared/mothers/word.mother';

export class CreateFileRequestMother {
	static create(
		id: string,
		user: UserEntity,
		title: string,
		description: string,
	): CreateFileRequest {
		return { id, user, title, description };
	}

	static random(user: UserEntity): CreateFileRequest {
		return this.create(UuidMother.random(), user, WordMother.random(), WordMother.random());
	}
}
