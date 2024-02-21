import { faqsSwaggerConfig } from './swagger/faqs-swagger.config';

export const faqsConfig = {
	entity: { name: 'faq' },
	globalRoute: 'faqs',
	swagger: faqsSwaggerConfig,
	repository: {
		repositoryInterface: 'FAQRepository',
	},
	getController: {
		constants: {
			context: 'FAQGetController',
		},
		logs: {
			findByCriteria: {
				requestLog: 'Request received to find FAQs by criteria',
			},
		},
	},
};
