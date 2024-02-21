import { FindOptionsWhere } from 'typeorm';

import { CriteriaQuery } from '../../shared/interfaces/criteria-query.interface';
import { SortColumn } from '../../shared/types/sort-column.type';
import { SortOrder } from '../../shared/types/sort-order.type';
import { FindExamplesByCriteriaRequest } from '../dtos/find-examples-by-criteria.request.dto';
import { ExampleEntity } from './example.entity';

export class ExampleCriteriaQuery implements CriteriaQuery<ExampleEntity> {
	readonly where: FindOptionsWhere<ExampleEntity>;
	readonly name: string;
	readonly take: number;
	readonly page: number;
	readonly skip: number;
	readonly sortColumn: SortColumn<ExampleEntity>;
	readonly sortOrder: SortOrder;

	constructor(
		where: FindOptionsWhere<ExampleEntity>,
		name: string,
		take: number,
		page: number,
		sortColumn: SortColumn<ExampleEntity>,
		sortOrder: SortOrder,
	) {
		this.where = where;
		this.name = name;
		this.take = take ?? 10;
		this.page = page ?? 1;
		this.skip = (this.page - 1) * this.take;
		this.sortColumn = sortColumn ?? 'createdAt';
		this.sortOrder = sortOrder ?? 'DESC';
	}

	static create(request: FindExamplesByCriteriaRequest): ExampleCriteriaQuery {
		const { name, take, page, sortColumn, sortOrder } = request;

		const where = this.createFindOptionsWhere(name);

		return new ExampleCriteriaQuery(where, name, take, page, sortColumn, sortOrder);
	}

	private static createFindOptionsWhere(name: string): FindOptionsWhere<ExampleEntity> {
		return {
			...(name ? { name } : {}),
		};
	}
}
