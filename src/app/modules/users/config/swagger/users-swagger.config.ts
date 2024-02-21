import { HttpStatus } from '@nestjs/common';

import { idParam } from '../../../shared/config/swagger/params/id-param.swagger';
import { sharedHeadersSwagger } from '../../../shared/config/swagger/shared-headers.swagger';
import { sharedResponsesSwagger } from '../../../shared/config/swagger/shared-responses.swagger';
import { CreateUserRequest } from '../../dtos/create-user-request.dto';
import { CreateUserResponse } from '../../dtos/create-user-response.dto';
import { DeleteUserResponse } from '../../dtos/delete-user-response.dto';
import { FindUserByIdResponse } from '../../dtos/find-user-by-id-response.dto';
import { FindUsersByCriteriaResponse } from '../../dtos/find-users-by-criteria-response.dto';
import { SoftDeleteUserResponse } from '../../dtos/soft-delete-user-response.dto';
import { UpdateUserPasswordRequest } from '../../dtos/update-user-password-request.dto';
import { UpdateUserRequest } from '../../dtos/update-user-request.dto';
import { UpdateUserResponse } from '../../dtos/update-user-response.dto';

const { ok, badRequest } = sharedResponsesSwagger;
const { findByCriteria, global } = sharedHeadersSwagger;

export const usersSwaggerConfig = {
	tag: 'Users',
	create: {
		operation: {
			summary: 'Create user',
		},
		body: { type: CreateUserRequest },
		response: {
			created: {
				status: HttpStatus.CREATED,
				description: 'Created',
				type: CreateUserResponse,
			},
			badRequest: {
				status: HttpStatus.BAD_REQUEST,
				description: 'Bad Request',
			},
		},
	},
	delete: {
		operation: {
			summary: 'Delete user',
		},
		param: idParam,
		response: {
			ok: {
				...ok,
				type: DeleteUserResponse,
			},
			badRequest: {
				status: HttpStatus.BAD_REQUEST,
				description: 'Bad Request',
			},
		},
	},
	softDelete: {
		operation: {
			summary: 'Soft delete user',
		},
		param: idParam,
		response: {
			ok: {
				...ok,
				type: SoftDeleteUserResponse,
			},
			badRequest: {
				...badRequest,
			},
		},
	},
	update: {
		operation: {
			summary: 'Update user',
		},
		body: { type: UpdateUserRequest },
		param: idParam,
		response: {
			created: {
				description: 'Updated',
				type: UpdateUserResponse,
			},
			badRequest,
		},
	},
	updateUserPassword: {
		operation: {
			summary: 'Update user password',
		},
		body: { type: UpdateUserPasswordRequest },
		param: idParam,
		response: {
			created: {
				description: 'Updated',
				type: UpdateUserResponse,
			},
			badRequest,
		},
	},
	findById: {
		operation: {
			summary: 'Find user by id',
		},
		param: idParam,
		response: {
			ok: {
				status: HttpStatus.OK,
				description: 'Ok',
				type: FindUserByIdResponse,
			},
			badRequest: {
				status: HttpStatus.BAD_REQUEST,
				description: 'Bad Request',
			},
		},
	},
	findByCriteria: {
		operation: {
			summary: 'Find users by criteria',
		},
		query: {
			name: {
				name: 'name',
				description: 'User name',
				example: 'Kubide',
				required: false,
				type: String,
			},
			email: {
				name: 'email',
				description: 'User email',
				example: 'desarrollo@kubide.es',
				required: false,
				type: String,
			},
		},
		response: {
			ok: {
				...ok,
				type: FindUsersByCriteriaResponse,
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
