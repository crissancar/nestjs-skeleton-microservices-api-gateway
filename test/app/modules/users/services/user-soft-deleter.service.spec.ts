import { usersConfig } from '../../../../../src/app/modules/users/config/users.config';
import { UserWithIdNotExistsException } from '../../../../../src/app/modules/users/exceptions/user-with-id-not-exists.exception';
import { UserSoftDeleter } from '../../../../../src/app/modules/users/services/user-soft-deleter.service';
import { UsersUnitTestingModule } from '../../../../config/unit-testing-modules/users-unit-testing-module';
import { UserRepositoryMock } from '../__mocks__/user-repository.mock';
import { CreateUserRequestMother } from '../dtos/create-user-request-mother.dto';
import { SoftDeleteUserRequestMother } from '../dtos/soft-delete-user-request-mother.dto';
import { UserEntityMother } from '../persistence/user-entity.mother';

const { repositoryInterface } = usersConfig.repository;

let softDeleter: UserSoftDeleter;
let repository: UserRepositoryMock;

describe('UserSoftDeleter', () => {
	it('should soft delete a valid user', async () => {
		const createUserRequest = CreateUserRequestMother.random();
		const expectedUser = UserEntityMother.fromRequest(createUserRequest);

		const softDeleteUserRequest = SoftDeleteUserRequestMother.create(expectedUser.id);

		await softDeleter.run(softDeleteUserRequest);

		repository.assertLastDeletedUserIs(expectedUser);
	});

	it('should throw UserWithIdNotExistsException', async () => {
		const request = SoftDeleteUserRequestMother.random();

		repository.mockDeleteThrowUserWithIdNotExistsException(request.id);

		await expect(softDeleter.run(request)).rejects.toThrow(UserWithIdNotExistsException);
	});
});

beforeAll(async () => {
	const testingModule = await UsersUnitTestingModule.create();

	repository = testingModule.get(repositoryInterface);
	softDeleter = testingModule.get(UserSoftDeleter);
});
