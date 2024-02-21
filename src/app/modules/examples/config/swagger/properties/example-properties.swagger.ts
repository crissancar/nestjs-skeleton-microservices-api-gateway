import { sharedPropertiesSwagger } from '../../../../shared/config/swagger/shared-properties.swagger';

export const examplePropertiesSwagger = {
	...sharedPropertiesSwagger,
	name: {
		type: String,
		example: 'Kubide',
		required: true,
	},
	deletedMessage: {
		type: String,
		example: 'Example with id <0287a3f4-ecbb-4b36-ba9d-cda63fb6d664> deleted',
		required: true,
	},
	softDeletedMessage: {
		type: String,
		example: 'Example with id <0287a3f4-ecbb-4b36-ba9d-cda63fb6d664> soft deleted',
		required: true,
	},
	examplesCriteria: {
		example: [
			{
				id: 'd77b8d13-550c-4579-8f57-dfdda982448b',
				name: 'Kubide1',
			},
			{
				id: '6e2f0f00-e23e-4b89-acea-ca5d2cab55a9',
				name: 'Kubide2',
			},
		],
	},
};
