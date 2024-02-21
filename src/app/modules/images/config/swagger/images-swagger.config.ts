import { idParam } from '../../../shared/config/swagger/params/id-param.swagger';
import { sharedHeadersSwagger } from '../../../shared/config/swagger/shared-headers.swagger';
import { sharedResponsesSwagger } from '../../../shared/config/swagger/shared-responses.swagger';
import { CreateImageResponse } from '../../dtos/create-image-response.dto';
import { DeleteImageResponse } from '../../dtos/delete-image-response.dto';
import { FindImageByIdResponse } from '../../dtos/find-image-by-id-response.dto';
import { FindImagesByCriteriaResponse } from '../../dtos/find-images-by-criteria-response.dto';
import { imagePropertiesSwagger } from './properties/image-properties.swagger';

const { ok, badRequest } = sharedResponsesSwagger;
const { global, findByCriteria } = sharedHeadersSwagger;
const { name } = imagePropertiesSwagger;

export const imagesSwaggerConfig = {
	tag: 'Images',
	create: {
		operation: {
			summary: 'Create image in database and upload to CDN',
		},
		response: {
			ok: {
				...ok,
				type: CreateImageResponse,
			},
			badRequest,
		},
	},
	delete: {
		operation: {
			summary: 'Delete image',
		},
		param: idParam,
		response: {
			ok: {
				...ok,
				type: DeleteImageResponse,
			},
			badRequest: {
				description: 'Bad Request',
			},
		},
	},
	findById: {
		operation: {
			summary: 'Find image by id',
		},
		param: idParam,
		response: {
			ok: {
				...ok,
				type: FindImageByIdResponse,
			},
			badRequest,
		},
	},
	findByCriteria: {
		operation: {
			summary: 'Find images by criteria',
		},
		query: {
			name: {
				...name,
				description: 'Image name',
				required: false,
			},
		},
		response: {
			ok: {
				...ok,
				type: FindImagesByCriteriaResponse,
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
