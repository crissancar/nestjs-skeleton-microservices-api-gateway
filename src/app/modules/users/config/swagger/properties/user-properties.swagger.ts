import { sharedPropertiesSwagger } from '../../../../shared/config/swagger/shared-properties.swagger';
import { UserAudiences } from '../../../../shared/enums/user-audiences.enum';

export const userPropertiesSwagger = {
	...sharedPropertiesSwagger,
	name: {
		type: String,
		example: 'Kubide',
		required: true,
	},
	email: {
		type: String,
		example: 'desarrollo@kubide.es',
		required: true,
	},
	password: {
		type: String,
		example: 'strongPassword',
		required: true,
	},
	sortName: {
		type: String,
		description: 'Sort the response by user name',
		example: 'Kubide',
		required: false,
	},
	audiences: {
		type: [UserAudiences],
		example: [UserAudiences.GENERAL],
		required: true,
	},
	deletedMessage: {
		type: String,
		example: 'User with id <0287a3f4-ecbb-4b36-ba9d-cda63fb6d664> deleted',
		required: true,
	},
	softDeletedMessage: {
		type: String,
		example: 'User with id <0287a3f4-ecbb-4b36-ba9d-cda63fb6d664> soft deleted',
		required: true,
	},
	usersCriteria: {
		example: [
			{
				id: 'd77b8d13-550c-4579-8f57-dfdda982448b',
				name: 'Kubide1',
				email: 'desarrollo@kubide1.es',
			},
			{
				id: '6e2f0f00-e23e-4b89-acea-ca5d2cab55a9',
				name: 'Kubide2',
				email: 'desarrollo@kubide2.es',
			},
		],
	},
};
