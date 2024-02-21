import { sharedHeadersSwagger } from '../../../shared/config/swagger/shared-headers.swagger';
import { sharedResponsesSwagger } from '../../../shared/config/swagger/shared-responses.swagger';
import { FindFAQsByCriteriaResponse } from '../../dtos/find-faqs-by-criteria-response.dto';
import { FAQLanguages } from '../../enums/faq-languages.enum';

const { ok, badRequest } = sharedResponsesSwagger;
const { findByCriteria, global } = sharedHeadersSwagger;

export const faqsSwaggerConfig = {
	tag: 'FAQs',
	findByCriteria: {
		operation: {
			summary: 'Find FAQs by criteria',
		},
		query: {
			language: {
				name: 'language',
				description: 'Language of FAQs',
				type: String,
				enum: FAQLanguages,
				example: FAQLanguages.ENGLISH,
				required: false,
			},
		},
		response: {
			ok: {
				...ok,
				type: FindFAQsByCriteriaResponse,
				headers: {
					...global,
					...findByCriteria,
				},
			},
			badRequest: {
				...badRequest,
			},
		},
	},
};
