import { usersConfig } from '../../../../../src/app/modules/users/config/users.config';
import { UserWithIdNotExistsException } from '../../../../../src/app/modules/users/exceptions/user-with-id-not-exists.exception';
import { UserFinderForStrategy } from '../../../../../src/app/modules/users/services/user-finder-for-strategy.service';
import { UsersUnitTestingModule } from '../../../../config/unit-testing-modules/users-unit-testing-module';
import { UserRepositoryMock } from '../__mocks__/user-repository.mock';
import { FindUserByIdRequestMother } from '../dtos/find-user-by-id-request-mother.dto';
import { UserEntityMother } from '../persistence/user-entity.mother';

const { repositoryInterface } = usersConfig.repository;

let finder: UserFinderForStrategy;
let repository: UserRepositoryMock;

describe('UserFinderForStrategy', () => {
	it('should find a valid user', async () => {
		const expectedUser = UserEntityMother.random();

		repository.whenSearchThenReturn(expectedUser);

		const request = FindUserByIdRequestMother.create(expectedUser.id);
		await finder.run(request);

		repository.assertLastSearchedUserIs(expectedUser.id);
	});

	it('should throw UserWithIdNotExistsException', async () => {
		repository.whenSearchThenReturn(null);

		const request = FindUserByIdRequestMother.random();

		await expect(finder.run(request)).rejects.toThrow(UserWithIdNotExistsException);
	});
});

beforeAll(async () => {
	const testingModule = await UsersUnitTestingModule.create();

	repository = testingModule.get(repositoryInterface);
	finder = testingModule.get(UserFinderForStrategy);
});
