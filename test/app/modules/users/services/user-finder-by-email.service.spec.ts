import { usersConfig } from '../../../../../src/app/modules/users/config/users.config';
import { UserWithEmailNotExistsException } from '../../../../../src/app/modules/users/exceptions/user-with-email-not-exists.exception';
import { UserFinderByEmail } from '../../../../../src/app/modules/users/services/user-finder-by-email.service';
import { UsersUnitTestingModule } from '../../../../config/unit-testing-modules/users-unit-testing-module';
import { UserRepositoryMock } from '../__mocks__/user-repository.mock';
import { FindUserByEmailRequestMother } from '../dtos/find-user-by-email-request-mother.dto';
import { UserEntityMother } from '../persistence/user-entity.mother';

const { repositoryInterface } = usersConfig.repository;

let finder: UserFinderByEmail;
let repository: UserRepositoryMock;

describe('UserFinderByEmail', () => {
	it('should find a valid user', async () => {
		const expectedUser = UserEntityMother.random();

		repository.whenSearchThenReturn(expectedUser);

		const request = FindUserByEmailRequestMother.create(expectedUser.email);
		await finder.run(request);

		repository.assertLastSearchedUserIs(expectedUser.email);
	});

	it('should throw UserWithEmailNotExistsException', async () => {
		repository.whenSearchThenReturn(null);

		const request = FindUserByEmailRequestMother.random();

		await expect(finder.run(request)).rejects.toThrow(UserWithEmailNotExistsException);
	});
});

beforeAll(async () => {
	const testingModule = await UsersUnitTestingModule.create();

	repository = testingModule.get(repositoryInterface);
	finder = testingModule.get(UserFinderByEmail);
});
