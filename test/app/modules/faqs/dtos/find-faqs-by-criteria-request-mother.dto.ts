import { FindFAQsByCriteriaRequest } from '../../../../../src/app/modules/faqs/dtos/find-faqs-by-criteria.request.dto';
import { FAQLanguages } from '../../../../../src/app/modules/faqs/enums/faq-languages.enum';
import { FAQEntity } from '../../../../../src/app/modules/faqs/persistence/faq.entity';
import { SortColumn } from '../../../../../src/app/modules/shared/types/sort-column.type';
import { SortOrder } from '../../../../../src/app/modules/shared/types/sort-order.type';

export class FindFAQsByCriteriaRequestMother {
	static create(
		language?: FAQLanguages,
		sortColumn?: SortColumn<FAQEntity>,
		sortOrder?: SortOrder,
		take?: number,
		page?: number,
	): FindFAQsByCriteriaRequest {
		return { language, sortColumn, sortOrder, take, page };
	}

	static fromExpectedFAQs(expectedFAQs: Array<FAQEntity>): FindFAQsByCriteriaRequest {
		const { language } = expectedFAQs[0];

		return this.create(language);
	}

	static random(): FindFAQsByCriteriaRequest {
		const language = FAQLanguages.ENGLISH;

		return this.create(language);
	}
}
