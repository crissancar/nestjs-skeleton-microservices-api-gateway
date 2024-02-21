import { idParam } from '../../../shared/config/swagger/params/id-param.swagger';
import { sharedHeadersSwagger } from '../../../shared/config/swagger/shared-headers.swagger';
import { sharedResponsesSwagger } from '../../../shared/config/swagger/shared-responses.swagger';
import { CreateFileResponse } from '../../dtos/create-file-response.dto';
import { DeleteFileResponse } from '../../dtos/delete-file-response.dto';
import { FindFileByIdResponse } from '../../dtos/find-file-by-id-response.dto';
import { FindFilesByCriteriaResponse } from '../../dtos/find-files-by-criteria-response.dto';
import { filePropertiesSwagger } from './properties/file-properties.swagger';

const { ok, badRequest } = sharedResponsesSwagger;
const { findByCriteria, global } = sharedHeadersSwagger;
const { mimetype, user } = filePropertiesSwagger;

export const filesSwaggerConfig = {
	tag: 'Files',
	create: {
		operation: {
			summary: 'Create file in database and upload to CDN',
		},
		response: {
			ok: {
				...ok,
				type: CreateFileResponse,
			},
			badRequest,
		},
	},
	delete: {
		operation: {
			summary: 'Delete file',
		},
		param: idParam,
		response: {
			ok: {
				...ok,
				type: DeleteFileResponse,
			},
			badRequest: {
				...badRequest,
			},
		},
	},
	findById: {
		operation: {
			summary: 'Find file by id',
		},
		param: idParam,
		response: {
			ok: {
				...ok,
				type: FindFileByIdResponse,
			},
			badRequest,
		},
	},
	findByCriteria: {
		operation: {
			summary: 'Find files by criteria',
		},
		query: {
			mimetype: {
				...mimetype,
				description: 'File mimetype',
				required: false,
			},
			user: {
				...user,
				description: 'File user id',
				required: false,
			},
		},
		response: {
			ok: {
				...ok,
				type: FindFilesByCriteriaResponse,
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
