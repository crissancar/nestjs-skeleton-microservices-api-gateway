import { FindOptionsWhere, ILike } from 'typeorm';

import { CriteriaQuery } from '../../shared/interfaces/criteria-query.interface';
import { SortColumn } from '../../shared/types/sort-column.type';
import { SortOrder } from '../../shared/types/sort-order.type';
import { FindFilesByCriteriaRequest } from '../dtos/find-files-by-criteria.request.dto';
import { FileEntity } from './file.entity';

export class FileCriteriaQuery implements CriteriaQuery<FileEntity> {
	readonly where: FindOptionsWhere<FileEntity>;
	readonly keyword: string;
	readonly take: number;
	readonly page: number;
	readonly skip: number;
	readonly sortMimetype: string;
	readonly sortColumn: SortColumn<FileEntity>;
	readonly sortOrder: SortOrder;

	constructor(
		where: FindOptionsWhere<FileEntity>,
		keyword: string,
		take: number,
		page: number,
		sortMimetype: string,
		sortColumn: SortColumn<FileEntity>,
		sortOrder: SortOrder,
	) {
		this.where = where;
		this.keyword = keyword;
		this.take = take ?? 10;
		this.page = page ?? 1;
		this.skip = (this.page - 1) * this.take;
		this.sortMimetype = sortMimetype;
		this.sortColumn = sortColumn ?? 'createdAt';
		this.sortOrder = sortOrder ?? 'DESC';
	}

	static create(request: FindFilesByCriteriaRequest): FileCriteriaQuery {
		const { mimetype, user, keyword, take, page, sortMimetype, sortColumn, sortOrder } = request;

		const where = this.createFindOptionsWhere(mimetype, user, keyword);

		return new FileCriteriaQuery(where, keyword, take, page, sortMimetype, sortColumn, sortOrder);
	}

	private static createFindOptionsWhere(
		mimetype: string,
		userId: string,
		keyword: string,
	): FindOptionsWhere<FileEntity> {
		return {
			...(mimetype && { mimetype }),
			...(userId && { userId }),
			...(keyword && { filename: ILike(`%${keyword}%`) }),
		};
	}
}
