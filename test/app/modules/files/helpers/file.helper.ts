import { FileEntity } from '../../../../../src/app/modules/files/persistence/file.entity';
import { UserEntity } from '../../../../../src/app/modules/users/persistence/user.entity';
import { NumberMother } from '../../shared/mothers/number.mother';
import { URLMother } from '../../shared/mothers/url.mother';
import { UuidMother } from '../../shared/mothers/uuid.mother';
import { WordMother } from '../../shared/mothers/word.mother';
import { DataSourceStorage } from '../../shared/storages/data-source.storage';

export class FileHelper {
	static async createRandom(user: UserEntity): Promise<FileEntity> {
		const repository = DataSourceStorage.dataSource.getRepository(FileEntity);

		const fileEntity = FileEntity.create(
			UuidMother.random(),
			user.id,
			URLMother.random(),
			WordMother.random(),
			WordMother.random(),
			WordMother.random(),
			WordMother.random(),
			WordMother.random(),
			WordMother.random(),
			NumberMother.random(),
		);

		return repository.save(fileEntity);
	}
}
