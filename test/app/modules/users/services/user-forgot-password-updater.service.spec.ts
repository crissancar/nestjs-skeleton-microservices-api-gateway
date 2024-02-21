import { usersConfig } from '../../../../../src/app/modules/users/config/users.config';
import { UserForgotPasswordUpdater } from '../../../../../src/app/modules/users/services/user-forgot-password-updater.service';
import { UsersUnitTestingModule } from '../../../../config/unit-testing-modules/users-unit-testing-module';
import { UserRepositoryMock } from '../__mocks__/user-repository.mock';
import { CreateUserRequestMother } from '../dtos/create-user-request-mother.dto';
import { UpdateUserForgotPasswordRequestMother } from '../dtos/update-user-forgot-password-request-mother.dto';
import { UserEntityMother } from '../persistence/user-entity.mother';

const { repositoryInterface } = usersConfig.repository;

let forgotPasswordUpdater: UserForgotPasswordUpdater;
let repository: UserRepositoryMock;

describe('UserForgotPasswordUpdater', () => {
	it('should update a valid user forgot password', async () => {
		const createUserRequest = CreateUserRequestMother.random();
		const expectedUser = UserEntityMother.fromRequest(createUserRequest);

		repository.whenSearchThenReturn(expectedUser);

		const updateUserForgotPasswordRequest =
			UpdateUserForgotPasswordRequestMother.random(expectedUser);

		await forgotPasswordUpdater.run(updateUserForgotPasswordRequest);

		repository.assertLastSavedUserIs(expectedUser);
	});
});

beforeAll(async () => {
	const testingModule = await UsersUnitTestingModule.create();

	repository = testingModule.get(repositoryInterface);
	forgotPasswordUpdater = testingModule.get(UserForgotPasswordUpdater);
});
