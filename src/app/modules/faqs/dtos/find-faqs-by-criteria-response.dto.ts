import { ApiProperty } from '@nestjs/swagger';

import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { faqPropertiesSwagger } from '../config/swagger/properties/faq-properties.swagger';
import { FAQEntity } from '../persistence/faq.entity';
import { FAQCriteriaQuery } from '../persistence/faq-criteria.query';
import { FindFAQResponse } from './find-faq-response.dto';

const { faqsCriteria } = faqPropertiesSwagger;

export class FindFAQsByCriteriaResponse {
	@ApiProperty(faqsCriteria)
	readonly data: Array<FindFAQResponse>;

	readonly count: number;

	readonly currentCount: number;

	readonly take: number;

	readonly page: number;

	constructor(
		data: Array<FindFAQResponse>,
		count: number,
		currentCount: number,
		take: number,
		page: number,
	) {
		this.data = data;
		this.count = count;
		this.currentCount = currentCount;
		this.take = take;
		this.page = page;
	}

	static create(
		query: FAQCriteriaQuery,
		criteriaResult: CriteriaResult<FAQEntity>,
	): FindFAQsByCriteriaResponse {
		const { data, count } = criteriaResult;
		const { take, page } = query;
		const currentCount = data.length;

		const findFAQResponseArray = data.map((faq) => FindFAQResponse.create(faq));

		return new FindFAQsByCriteriaResponse(findFAQResponseArray, count, currentCount, take, page);
	}
}
