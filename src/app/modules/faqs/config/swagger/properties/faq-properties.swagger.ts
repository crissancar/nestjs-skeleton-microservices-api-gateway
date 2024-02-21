import { sharedPropertiesSwagger } from '../../../../shared/config/swagger/shared-properties.swagger';
import { FAQLanguages } from '../../../enums/faq-languages.enum';

export const faqPropertiesSwagger = {
	...sharedPropertiesSwagger,
	language: {
		type: FAQLanguages,
		example: FAQLanguages.ENGLISH,
		required: true,
	},
	faqsCriteria: {
		example: [
			{
				id: 'd77b8d13-550c-4579-8f57-dfdda982448b',
				language: 'EN',
				title: 'FAQ 1',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a lectus cursus, pharetra leo sit amet, blandit ligula.',
			},
			{
				id: '6e2f0f00-e23e-4b89-acea-ca5d2cab55a9',
				language: 'EN',
				title: 'FAQ 2',
				text: 'Vestibulum et quam sit amet justo ultricies facilisis eget vitae libero',
			},
		],
	},
};
