import { HttpStatus } from '@nestjs/common';

import { idParam } from '../../../shared/config/swagger/params/id-param.swagger';
import { sharedHeadersSwagger } from '../../../shared/config/swagger/shared-headers.swagger';
import { sharedResponsesSwagger } from '../../../shared/config/swagger/shared-responses.swagger';
import { CreateExampleRequest } from '../../dtos/create-example-request.dto';
import { CreateExampleResponse } from '../../dtos/create-example-response.dto';
import { DeleteExampleResponse } from '../../dtos/delete-example-response.dto';
import { FindExampleByIdResponse } from '../../dtos/find-example-by-id-response.dto';
import { FindExamplesByCriteriaResponse } from '../../dtos/find-examples-by-criteria-response.dto';
import { SoftDeleteExampleResponse } from '../../dtos/soft-delete-example-response.dto';
import { UpdateExampleRequest } from '../../dtos/update-example-request.dto';
import { UpdateExampleResponse } from '../../dtos/update-example-response.dto';

const { ok, badRequest } = sharedResponsesSwagger;
const { findByCriteria, global } = sharedHeadersSwagger;

export const examplesSwaggerConfig = {
	tag: 'Examples',
	create: {
		operation: {
			summary: 'Create example',
		},
		body: { type: CreateExampleRequest },
		response: {
			created: {
				status: HttpStatus.CREATED,
				description: 'Created',
				type: CreateExampleResponse,
			},
			badRequest: {
				status: HttpStatus.BAD_REQUEST,
				description: 'Bad Request',
			},
		},
	},
	delete: {
		operation: {
			summary: 'Delete example',
		},
		param: idParam,
		response: {
			ok: {
				...ok,
				type: DeleteExampleResponse,
			},
			badRequest: {
				status: HttpStatus.BAD_REQUEST,
				description: 'Bad Request',
			},
		},
	},
	softDelete: {
		operation: {
			summary: 'Soft delete example',
		},
		param: idParam,
		response: {
			ok: {
				...ok,
				type: SoftDeleteExampleResponse,
			},
			badRequest: {
				...badRequest,
			},
		},
	},
	update: {
		operation: {
			summary: 'Update example',
		},
		body: { type: UpdateExampleRequest },
		param: idParam,
		response: {
			created: {
				description: 'Updated',
				type: UpdateExampleResponse,
			},
			badRequest,
		},
	},
	findById: {
		operation: {
			summary: 'Find example by id',
		},
		param: idParam,
		response: {
			ok: {
				status: HttpStatus.OK,
				description: 'Ok',
				type: FindExampleByIdResponse,
			},
			badRequest: {
				status: HttpStatus.BAD_REQUEST,
				description: 'Bad Request',
			},
		},
	},
	findByCriteria: {
		operation: {
			summary: 'Find examples by criteria',
		},
		query: {
			name: {
				name: 'name',
				description: 'Example name',
				example: 'Kubide',
				required: false,
				type: String,
			},
		},
		response: {
			ok: {
				...ok,
				type: FindExamplesByCriteriaResponse,
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
