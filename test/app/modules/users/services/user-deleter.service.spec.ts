import { usersConfig } from '../../../../../src/app/modules/users/config/users.config';
import { UserWithIdNotExistsException } from '../../../../../src/app/modules/users/exceptions/user-with-id-not-exists.exception';
import { UserDeleter } from '../../../../../src/app/modules/users/services/user-deleter.service';
import { UsersUnitTestingModule } from '../../../../config/unit-testing-modules/users-unit-testing-module';
import { UserRepositoryMock } from '../__mocks__/user-repository.mock';
import { CreateUserRequestMother } from '../dtos/create-user-request-mother.dto';
import { DeleteUserRequestMother } from '../dtos/delete-user-request-mother.dto';
import { UserEntityMother } from '../persistence/user-entity.mother';

const { repositoryInterface } = usersConfig.repository;

let deleter: UserDeleter;
let repository: UserRepositoryMock;

describe('UserDeleter', () => {
	it('should delete a valid user', async () => {
		const createUserRequest = CreateUserRequestMother.random();
		const expectedUser = UserEntityMother.fromRequest(createUserRequest);

		const deleteUserRequest = DeleteUserRequestMother.create(expectedUser.id);

		await deleter.run(deleteUserRequest);

		repository.assertLastDeletedUserIs(expectedUser);
	});

	it('should throw UserWithIdNotExistsException', async () => {
		const deleteUserRequest = DeleteUserRequestMother.random();

		repository.mockDeleteThrowUserWithIdNotExistsException(deleteUserRequest.id);

		await expect(deleter.run(deleteUserRequest)).rejects.toThrow(UserWithIdNotExistsException);
	});
});

beforeAll(async () => {
	const testingModule = await UsersUnitTestingModule.create();

	repository = testingModule.get(repositoryInterface);
	deleter = testingModule.get(UserDeleter);
});
