import { CreateForgotPasswordRequest } from '../../../../../src/app/modules/forgot-passwords/dtos/create-forgot-password-request.dto';
import { ForgotPasswordEntity } from '../../../../../src/app/modules/forgot-passwords/persistence/forgot-password.entity';
import { ForgotPasswordCreator } from '../../../../../src/app/modules/forgot-passwords/services/forgot-password-creator.service';
import { AppStorage } from '../../shared/storages/app.storage';
import { DataSourceStorage } from '../../shared/storages/data-source.storage';

export class ForgotPasswordHelper {
	static async create(request: CreateForgotPasswordRequest): Promise<ForgotPasswordEntity> {
		const creator = AppStorage.app.get(ForgotPasswordCreator);

		const createdForgotPassword = await creator.run(request);

		return this.findById(createdForgotPassword.id);
	}

	static async findRandom(): Promise<ForgotPasswordEntity> {
		const repository = DataSourceStorage.dataSource.getRepository(ForgotPasswordEntity);

		const users = await repository.find();

		const randomIndex = Math.floor(Math.random() * users.length);

		return users[randomIndex];
	}

	static async findById(id: string): Promise<ForgotPasswordEntity> {
		const repository = DataSourceStorage.dataSource.getRepository(ForgotPasswordEntity);

		return repository.findOne({ where: { id } });
	}
}
