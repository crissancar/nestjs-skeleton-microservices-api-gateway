import { FindOptionsWhere } from 'typeorm';

import { CriteriaQuery } from '../../shared/interfaces/criteria-query.interface';
import { SortColumn } from '../../shared/types/sort-column.type';
import { SortOrder } from '../../shared/types/sort-order.type';
import { FindFAQsByCriteriaRequest } from '../dtos/find-faqs-by-criteria.request.dto';
import { FAQLanguages } from '../enums/faq-languages.enum';
import { FAQEntity } from './faq.entity';

export class FAQCriteriaQuery implements CriteriaQuery<FAQEntity> {
	readonly where: FindOptionsWhere<FAQEntity>;
	readonly language: FAQLanguages;
	readonly take: number;
	readonly page: number;
	readonly skip: number;
	readonly sortColumn: SortColumn<FAQEntity>;
	readonly sortOrder: SortOrder;

	constructor(
		where: FindOptionsWhere<FAQEntity>,
		language: FAQLanguages,
		take: number,
		page: number,
		sortColumn: SortColumn<FAQEntity>,
		sortOrder: SortOrder,
	) {
		this.where = where;
		this.language = language;
		this.take = take ?? 10;
		this.page = page ?? 1;
		this.skip = (this.page - 1) * this.take;
		this.sortColumn = sortColumn ?? 'createdAt';
		this.sortOrder = sortOrder ?? 'DESC';
	}

	static create(request: FindFAQsByCriteriaRequest): FAQCriteriaQuery {
		const { language, take, page, sortColumn, sortOrder } = request;

		const where = this.createFindOptionsWhere(language);

		return new FAQCriteriaQuery(where, language, take, page, sortColumn, sortOrder);
	}

	private static createFindOptionsWhere(language: FAQLanguages): FindOptionsWhere<FAQEntity> {
		return {
			...(language ? { language } : {}),
		};
	}
}
