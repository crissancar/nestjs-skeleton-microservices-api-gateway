import { sharedPropertiesSwagger } from '../../../../shared/config/swagger/shared-properties.swagger';

export const filePropertiesSwagger = {
	...sharedPropertiesSwagger,
	file: {
		name: 'file',
		required: true,
		type: String,
		format: 'binary',
	},
	mimetype: {
		name: 'mimetype',
		example: 'image/png',
		required: true,
		type: String,
	},
	user: {
		name: 'user',
		example: 'feb27195-4c1c-4776-a4ed-de52c5c49f52',
		required: true,
		type: String,
	},
	filename: {
		type: String,
		example: '1677831141020903923395.png',
		required: true,
	},
	title: {
		type: String,
		example: 'File title',
		required: true,
	},
	description: {
		type: String,
		example: 'File description',
		required: true,
	},
	url: {
		type: String,
		example: 'http://localhost:8081/files/2023/3/1677831141020903923395.png',
		required: true,
	},
	size: {
		type: String,
		example: '15713',
		required: true,
	},
	sortMimetype: {
		type: String,
		description: 'Sort the response by file mimetype',
		example: 'image/jpeg',
		required: false,
	},
	deleteMessage: {
		name: 'message',
		example: 'File with id <0287a3f4-ecbb-4b36-ba9d-cda63fb6d664> deleted',
		required: false,
		type: String,
	},
	filesCriteria: {
		example: [
			{
				id: 'e8445124-e116-43fb-983c-7b8040cc824a',
				user: 'feb27195-4c1c-4776-a4ed-de52c5c49f52',
				filename: '1677831141020903923395.png',
				title: 'File title',
				description: 'File description',
				mimetype: 'image/png',
				url: 'http://localhost:8081/files/2023/3/1677831141020903923395.png',
			},
			{
				id: 'b5f910f0-30a4-46bc-8237-f6c990ddf9c4',
				user: 'feb27195-4c1c-4776-a4ed-de52c5c49f52',
				filename: '1677830733036996407059.png',
				title: 'File title',
				description: 'File description',
				mimetype: 'image/png',
				url: 'http://localhost:8081/files/2023/3/1677830733036996407059.png',
			},
		],
	},
};
