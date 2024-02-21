import { Inject, Injectable } from '@nestjs/common';

import { faqsConfig } from '../config/faqs.config';
import { FindFAQsByCriteriaRequest } from '../dtos/find-faqs-by-criteria.request.dto';
import { FindFAQsByCriteriaResponse } from '../dtos/find-faqs-by-criteria-response.dto';
import { FAQCriteriaQuery } from '../persistence/faq-criteria.query';
import { FAQRepository } from '../repositories/faq.repository';

const { repositoryInterface } = faqsConfig.repository;

@Injectable()
export class FAQsFinderByCriteria {
	constructor(@Inject(repositoryInterface) private readonly repository: FAQRepository) {}

	async run(request: FindFAQsByCriteriaRequest): Promise<FindFAQsByCriteriaResponse> {
		const query = FAQCriteriaQuery.create(request);

		const criteriaResult = await this.repository.findByCriteria(query);

		return FindFAQsByCriteriaResponse.create(query, criteriaResult);
	}
}
