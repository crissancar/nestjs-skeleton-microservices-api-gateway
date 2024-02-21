import { idParam } from '../../../shared/config/swagger/params/id-param.swagger';
import { sharedResponsesSwagger } from '../../../shared/config/swagger/shared-responses.swagger';
import { CompleteForgotPasswordRequest } from '../../dtos/complete-forgot-password-request.dto';
import { CompleteForgotPasswordResponse } from '../../dtos/complete-forgot-password-response.dto';
import { CreateForgotPasswordRequest } from '../../dtos/create-forgot-password-request.dto';
import { CreateForgotPasswordResponse } from '../../dtos/create-forgot-password-response.dto';

const { ok, badRequest } = sharedResponsesSwagger;

export const forgotPasswordsSwaggerConfig = {
	tag: 'Forgot passwords',
	createForgotPassword: {
		operation: {
			summary: 'Create user forgot password',
		},
		body: { type: CreateForgotPasswordRequest },
		response: {
			ok: {
				...ok,
				type: CreateForgotPasswordResponse,
			},
			badRequest,
		},
	},
	completeForgotPassword: {
		operation: {
			summary: 'Complete user forgot password',
		},
		body: { type: CompleteForgotPasswordRequest },
		param: idParam,
		response: {
			ok: {
				...ok,
				type: CompleteForgotPasswordResponse,
			},
			badRequest,
		},
	},
};
