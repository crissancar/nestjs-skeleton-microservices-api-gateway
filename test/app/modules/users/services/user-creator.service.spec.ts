import { usersConfig } from '../../../../../src/app/modules/users/config/users.config';
import { UserWithEmailAlreadyExistsException } from '../../../../../src/app/modules/users/exceptions/user-with-email-already-exists.exception';
import { UserCreator } from '../../../../../src/app/modules/users/services/user-creator.service';
import { UsersUnitTestingModule } from '../../../../config/unit-testing-modules/users-unit-testing-module';
import { UserRepositoryMock } from '../__mocks__/user-repository.mock';
import { CreateUserRequestMother } from '../dtos/create-user-request-mother.dto';
import { UserEntityMother } from '../persistence/user-entity.mother';

const { repositoryInterface } = usersConfig.repository;

let creator: UserCreator;
let repository: UserRepositoryMock;

describe('UserCreator', () => {
	it('should create a valid user', async () => {
		const request = CreateUserRequestMother.random();
		const expectedUser = UserEntityMother.fromRequest(request);

		await creator.run(request);

		repository.assertLastSavedUserIs(expectedUser);
	});

	it('should throw UserWithEmailAlreadyExistsException', async () => {
		const request = CreateUserRequestMother.random();

		repository.mockSaveThrowUserWithEmailAlreadyExistsException(request.email);

		await expect(creator.run(request)).rejects.toThrow(UserWithEmailAlreadyExistsException);
	});
});

beforeAll(async () => {
	const testingModule = await UsersUnitTestingModule.create();

	repository = testingModule.get(repositoryInterface);
	creator = testingModule.get(UserCreator);
});
