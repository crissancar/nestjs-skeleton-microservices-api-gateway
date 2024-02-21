import { FindOptionsWhere } from 'typeorm';

import { CriteriaQuery } from '../../shared/interfaces/criteria-query.interface';
import { SortColumn } from '../../shared/types/sort-column.type';
import { SortOrder } from '../../shared/types/sort-order.type';
import { UserEntity } from '../../users/persistence/user.entity';
import { ImageEntity } from '../persistence/image.entity';
import { FindImagesByCriteriaRequest } from './find-images-by-criteria.request.dto';

export class ImageCriteriaQuery implements CriteriaQuery<ImageEntity> {
	readonly where: FindOptionsWhere<ImageEntity>;
	readonly name: string;
	readonly take: number;
	readonly page: number;
	readonly skip: number;
	readonly sortColumn: SortColumn<ImageEntity>;
	readonly sortOrder: SortOrder;

	constructor(
		where: FindOptionsWhere<UserEntity>,
		name: string,
		take: number,
		page: number,
		sortColumn: SortColumn<ImageEntity>,
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

	static create(request: FindImagesByCriteriaRequest): ImageCriteriaQuery {
		const { name, take, page, sortColumn, sortOrder } = request;

		const where = this.createFindOptionsWhere(name);

		return new ImageCriteriaQuery(where, name, take, page, sortColumn, sortOrder);
	}

	static createFindOptionsWhere(name: string): FindOptionsWhere<ImageEntity> {
		return {
			...(name ? { name } : {}),
		};
	}
}
