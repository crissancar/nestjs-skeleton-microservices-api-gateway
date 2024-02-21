import { FindUserByIdResponse } from '../../../../../src/app/modules/users/dtos/find-user-by-id-response.dto';
import { FindUsersByCriteriaResponse } from '../../../../../src/app/modules/users/dtos/find-users-by-criteria-response.dto';
import { UserEntity } from '../../../../../src/app/modules/users/persistence/user.entity';

export class FindUsersByCriteriaResponseMother {
	static create(
		data: Array<FindUserByIdResponse>,
		count: number,
		currentCount: number,
		take?: number,
		page?: number,
	): FindUsersByCriteriaResponse {
		return { data, count, currentCount, take, page };
	}

	static fromExpectedUsers(expectedUsers: Array<UserEntity>): FindUsersByCriteriaResponse {
		const take = 10;
		const page = 1;
		const count = expectedUsers.length;
		const currentCount = expectedUsers.length;

		const findUserResponseArray = expectedUsers.map((user) => FindUserByIdResponse.create(user));

		return this.create(findUserResponseArray, count, currentCount, take, page);
	}
}
