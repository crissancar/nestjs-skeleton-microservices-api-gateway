import { SortColumn } from '../../../../../src/app/modules/shared/types/sort-column.type';
import { SortOrder } from '../../../../../src/app/modules/shared/types/sort-order.type';
import { FindUsersByCriteriaRequest } from '../../../../../src/app/modules/users/dtos/find-users-by-criteria.request.dto';
import { UserEntity } from '../../../../../src/app/modules/users/persistence/user.entity';
import { EmailMother } from '../../shared/mothers/email.mother';
import { FirstNameMother } from '../../shared/mothers/first-name.mother';

export class FindUsersByCriteriaRequestMother {
	static create(
		name?: string,
		email?: string,
		keyword?: string,
		sortName?: string,
		sortColumn?: SortColumn<UserEntity>,
		sortOrder?: SortOrder,
		take?: number,
		page?: number,
	): FindUsersByCriteriaRequest {
		return { name, email, keyword, sortName, sortColumn, sortOrder, take, page };
	}

	static fromExpectedUsers(expectedUsers: Array<UserEntity>): FindUsersByCriteriaRequest {
		const { name, email } = expectedUsers[0];
		const keyword = name;
		const sortName = name;

		return this.create(name, email, keyword, sortName);
	}

	static random(): FindUsersByCriteriaRequest {
		const name = FirstNameMother.random();
		const email = EmailMother.random();
		const keyword = name;
		const sortName = name;

		return this.create(name, email, keyword, sortName);
	}
}
