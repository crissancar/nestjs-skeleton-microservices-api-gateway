import { usersConfig } from '../../../../../src/app/modules/users/config/users.config';
import { UsersFinderByCriteria } from '../../../../../src/app/modules/users/services/users-finder-by-criteria.service';
import { UsersUnitTestingModule } from '../../../../config/unit-testing-modules/users-unit-testing-module';
import { UserRepositoryMock } from '../__mocks__/user-repository.mock';
import { FindUsersByCriteriaRequestMother } from '../dtos/find-users-by-criteria-request-mother.dto';
import { FindUsersByCriteriaResponseMother } from '../dtos/find-users-by-criteria-response-mother.dto';
import { UserEntityMother } from '../persistence/user-entity.mother';

const { repositoryInterface } = usersConfig.repository;

let finder: UsersFinderByCriteria;
let repository: UserRepositoryMock;

describe('UsersFinderByCriteria', () => {
	it('should find a valid users', async () => {
		const user = UserEntityMother.random();
		const expectedUsers = [user, user, user];

		repository.whenSearchByCriteriaThenReturn(expectedUsers);

		const expectedResult = FindUsersByCriteriaResponseMother.fromExpectedUsers(expectedUsers);

		const request = FindUsersByCriteriaRequestMother.fromExpectedUsers(expectedUsers);
		const result = await finder.run(request);

		repository.assertResultIsEqual(expectedResult, result);
	});

	it('should return an empty array', async () => {
		const user = UserEntityMother.random();
		const expectedUsers = [user];

		repository.whenSearchByCriteriaThenReturn([]);

		const expectedResult = FindUsersByCriteriaResponseMother.fromExpectedUsers([]);

		const request = FindUsersByCriteriaRequestMother.fromExpectedUsers(expectedUsers);
		const result = await finder.run(request);

		repository.assertResultIsEqual(expectedResult, result);
	});
});

beforeAll(async () => {
	const testingModule = await UsersUnitTestingModule.create();

	repository = testingModule.get(repositoryInterface);
	finder = testingModule.get(UsersFinderByCriteria);
});
