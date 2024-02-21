import { CreateImageRequest } from '../../../../../src/app/modules/images/dtos/create-image-request.dto';
import { UserEntity } from '../../../../../src/app/modules/users/persistence/user.entity';
import { UuidMother } from '../../shared/mothers/uuid.mother';
import { WordMother } from '../../shared/mothers/word.mother';

export class CreateImageRequestMother {
	static create(id: string, user: UserEntity, name: string, profile: string): CreateImageRequest {
		return { id, user, name, profile };
	}

	static random(user: UserEntity): CreateImageRequest {
		return this.create(UuidMother.random(), user, WordMother.random(), 'default');
	}
}
