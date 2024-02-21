import { InvalidCredentialsException } from '../../../../../src/app/modules/auth/exceptions/invalid-credentials.exception';
import { usersConfig } from '../../../../../src/app/modules/users/config/users.config';
import { UserFinderForAuthentication } from '../../../../../src/app/modules/users/services/user-finder-for-authentication.service';
import { UsersUnitTestingModule } from '../../../../config/unit-testing-modules/users-unit-testing-module';
import { UserRepositoryMock } from '../__mocks__/user-repository.mock';
import { FindUserByEmailRequestMother } from '../dtos/find-user-by-email-request-mother.dto';
import { UserEntityMother } from '../persistence/user-entity.mother';

const { repositoryInterface } = usersConfig.repository;

let finder: UserFinderForAuthentication;
let repository: UserRepositoryMock;

describe('UserFinderForAuthentication', () => {
	it('should find a valid user', async () => {
		const expectedUser = UserEntityMother.random();

		repository.whenSearchThenReturn(expectedUser);

		const request = FindUserByEmailRequestMother.create(expectedUser.id);
		await finder.run(request);

		repository.assertLastSearchedUserIs(expectedUser.id);
	});

	it('should throw InvalidCredentialsException', async () => {
		repository.whenSearchThenReturn(null);

		const request = FindUserByEmailRequestMother.random();

		await expect(finder.run(request)).rejects.toThrow(InvalidCredentialsException);
	});
});

beforeAll(async () => {
	const testingModule = await UsersUnitTestingModule.create();

	repository = testingModule.get(repositoryInterface);
	finder = testingModule.get(UserFinderForAuthentication);
});
