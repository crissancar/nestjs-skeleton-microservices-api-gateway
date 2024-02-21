import { InvalidCredentialsException } from '../../../../../src/app/modules/auth/exceptions/invalid-credentials.exception';
import { Bcrypt } from '../../../../../src/app/modules/shared/services/bcrypt.service';
import { usersConfig } from '../../../../../src/app/modules/users/config/users.config';
import { UserPasswordUpdater } from '../../../../../src/app/modules/users/services/user-password-updater.service';
import { UsersUnitTestingModule } from '../../../../config/unit-testing-modules/users-unit-testing-module';
import { UserRepositoryMock } from '../__mocks__/user-repository.mock';
import { CreateUserRequestMother } from '../dtos/create-user-request-mother.dto';
import { UpdateUserPasswordRequestMother } from '../dtos/update-user-password-request-mother.dto';
import { UserEntityMother } from '../persistence/user-entity.mother';

const { repositoryInterface } = usersConfig.repository;

let passwordUpdater: UserPasswordUpdater;
let repository: UserRepositoryMock;

describe('UserPasswordUpdater', () => {
	it('should update a valid user password', async () => {
		const createUserRequest = CreateUserRequestMother.random();
		const expectedUser = UserEntityMother.fromRequest(createUserRequest);
		const expectedUserWithHashedPassword = {
			...expectedUser,
			password: Bcrypt.hash(expectedUser.password),
		};

		repository.whenSearchThenReturn(expectedUserWithHashedPassword);

		const updateUserPasswordRequest = UpdateUserPasswordRequestMother.random(
			expectedUser,
			expectedUser.password,
		);

		await passwordUpdater.run(updateUserPasswordRequest);

		repository.assertLastSavedUserIs(expectedUser);
	});

	it('should throw InvalidCredentialsException', async () => {
		const createUserRequest = CreateUserRequestMother.random();
		const expectedUser = UserEntityMother.fromRequest(createUserRequest);

		repository.whenSearchThenReturn(expectedUser);

		const updateUserPassword = UpdateUserPasswordRequestMother.random(
			expectedUser,
			expectedUser.password,
		);

		repository.mockSaveThrowInvalidCredentialsException();

		await expect(passwordUpdater.run(updateUserPassword)).rejects.toThrow(
			InvalidCredentialsException,
		);
	});
});

beforeAll(async () => {
	const testingModule = await UsersUnitTestingModule.create();

	repository = testingModule.get(repositoryInterface);
	passwordUpdater = testingModule.get(UserPasswordUpdater);
});
