import { sharedPropertiesSwagger } from '../../../../shared/config/swagger/shared-properties.swagger';
import { PolicyLanguages } from '../../../enums/policy-languages.enum';
import { PolicyTypes } from '../../../enums/policy-types.enum';

export const policyPropertiesSwagger = {
	...sharedPropertiesSwagger,
	title: {
		name: 'title',
		example: 'Cookies EN',
		type: String,
		required: false,
	},
	description: {
		name: 'description',
		example: 'File description',
		type: String,
		required: false,
	},
	type: {
		name: 'type',
		example: 'COOKIES',
		type: String,
		enum: PolicyTypes,
		required: false,
	},
	language: {
		name: 'language',
		example: 'EN',
		type: String,
		enum: PolicyLanguages,
		required: false,
	},
	url: {
		name: 'url',
		example: 'http://localhost:8081/files/2023/3/1677831141020903923395.png',
		type: String,
		required: false,
	},
	policiesCriteria: {
		example: [
			{
				id: 'e8445124-e116-43fb-983c-7b8040cc824a',
				title: 'Cookies EN',
				description: 'File description',
				type: 'COOKIES',
				language: 'EN',
				url: 'http://localhost:8081/files/2023/3/1677831141020903923395.png',
			},
			{
				id: 'b5f910f0-30a4-46bc-8237-f6c990ddf9c4',
				title: 'Cookies ES',
				description: 'File description',
				type: 'COOKIES',
				language: 'ES',
				url: 'http://localhost:8081/files/2023/3/1677830733036996407059.png',
			},
		],
	},
};
