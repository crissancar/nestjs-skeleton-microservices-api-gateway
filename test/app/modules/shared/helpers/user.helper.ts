import { CreateUserRequest } from '../../../../../src/app/modules/users/dtos/create-user-request.dto';
import { UserEntity } from '../../../../../src/app/modules/users/persistence/user.entity';
import { UserCreator } from '../../../../../src/app/modules/users/services/user-creator.service';
import { CreateUserRequestMother } from '../../users/dtos/create-user-request-mother.dto';
import { AppStorage } from '../storages/app.storage';
import { DataSourceStorage } from '../storages/data-source.storage';

export class UserHelper {
	static async create(request: CreateUserRequest): Promise<UserEntity> {
		const creator = AppStorage.app.get(UserCreator);

		const createdUser = await creator.run(request);

		return this.findById(createdUser.id);
	}

	static async createRandom(): Promise<UserEntity> {
		const creator = AppStorage.app.get(UserCreator);

		const request = CreateUserRequestMother.random();

		const createdUser = await creator.run(request);

		return this.findById(createdUser.id);
	}

	static async findRandom(): Promise<UserEntity> {
		const repository = DataSourceStorage.dataSource.getRepository(UserEntity);

		const users = await repository.find();

		const randomIndex = Math.floor(Math.random() * users.length);

		return users[randomIndex];
	}

	static async findById(id: string): Promise<UserEntity> {
		const repository = DataSourceStorage.dataSource.getRepository(UserEntity);

		return repository.findOne({ where: { id } });
	}
}
