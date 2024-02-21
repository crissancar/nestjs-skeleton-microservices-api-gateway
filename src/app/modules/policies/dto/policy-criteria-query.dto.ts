import { FindOptionsWhere } from 'typeorm';

import { CriteriaQuery } from '../../shared/interfaces/criteria-query.interface';
import { SortColumn } from '../../shared/types/sort-column.type';
import { SortOrder } from '../../shared/types/sort-order.type';
import { PolicyLanguages } from '../enums/policy-languages.enum';
import { PolicyTypes } from '../enums/policy-types.enum';
import { PolicyEntity } from '../persistence/policy.entity';
import { FindPoliciesByCriteriaRequest } from './find-policies-by-criteria.request.dto';

export class PolicyCriteriaQuery implements CriteriaQuery<PolicyEntity> {
	readonly where: FindOptionsWhere<PolicyEntity>;
	readonly type: PolicyTypes;
	readonly language: PolicyLanguages;
	readonly take: number;
	readonly page: number;
	readonly skip: number;
	readonly sortColumn: SortColumn<PolicyEntity>;
	readonly sortOrder: SortOrder;

	constructor(
		where: FindOptionsWhere<PolicyEntity>,
		type: PolicyTypes,
		language: PolicyLanguages,
		take: number,
		page: number,
		sortColumn: SortColumn<PolicyEntity>,
		sortOrder: SortOrder,
	) {
		this.where = where;
		this.type = type;
		this.language = language;
		this.take = take ?? 10;
		this.page = page ?? 1;
		this.skip = (this.page - 1) * this.take;
		this.sortColumn = sortColumn ?? 'createdAt';
		this.sortOrder = sortOrder ?? 'DESC';
	}

	static create(request: FindPoliciesByCriteriaRequest): PolicyCriteriaQuery {
		const { type, language, take, page, sortColumn, sortOrder } = request;

		const where = this.createFindOptionsWhere(type, language);

		return new PolicyCriteriaQuery(where, type, language, take, page, sortColumn, sortOrder);
	}

	private static createFindOptionsWhere(
		type: PolicyTypes,
		language: PolicyLanguages,
	): FindOptionsWhere<PolicyEntity> {
		return {
			...(type ? { type } : {}),
			...(language ? { language } : {}),
		};
	}
}
