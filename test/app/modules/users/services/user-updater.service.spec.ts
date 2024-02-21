import { usersConfig } from '../../../../../src/app/modules/users/config/users.config';
import { UserWithEmailAlreadyExistsException } from '../../../../../src/app/modules/users/exceptions/user-with-email-already-exists.exception';
import { UserUpdater } from '../../../../../src/app/modules/users/services/user-updater.service';
import { UsersUnitTestingModule } from '../../../../config/unit-testing-modules/users-unit-testing-module';
import { UserRepositoryMock } from '../__mocks__/user-repository.mock';
import { CreateUserRequestMother } from '../dtos/create-user-request-mother.dto';
import { UpdateUserRequestMother } from '../dtos/update-user-request-mother.dto';
import { UserEntityMother } from '../persistence/user-entity.mother';

const { repositoryInterface } = usersConfig.repository;

let updater: UserUpdater;
let repository: UserRepositoryMock;

describe('UserUpdater', () => {
	it('should update a valid user', async () => {
		const createUserRequest = CreateUserRequestMother.random();
		const expectedUser = UserEntityMother.fromRequest(createUserRequest);

		repository.whenSearchThenReturn(expectedUser);

		const updateUserRequest = UpdateUserRequestMother.random(expectedUser.id);

		await updater.run(updateUserRequest);

		repository.assertLastSavedUserIs(expectedUser);
	});

	it('should throw UserWithEmailAlreadyExistsException', async () => {
		const createUserRequest = CreateUserRequestMother.random();
		const expectedUser = UserEntityMother.fromRequest(createUserRequest);

		repository.whenSearchThenReturn(expectedUser);

		const updateUserRequest = UpdateUserRequestMother.random(expectedUser.id);

		repository.mockSaveThrowUserWithEmailAlreadyExistsException(updateUserRequest.email);

		await expect(updater.run(updateUserRequest)).rejects.toThrow(
			UserWithEmailAlreadyExistsException,
		);
	});
});

beforeAll(async () => {
	const testingModule = await UsersUnitTestingModule.create();

	repository = testingModule.get(repositoryInterface);
	updater = testingModule.get(UserUpdater);
});
