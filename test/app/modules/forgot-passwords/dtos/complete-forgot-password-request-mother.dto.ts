import { CompleteForgotPasswordRequest } from '../../../../../src/app/modules/forgot-passwords/dtos/complete-forgot-password-request.dto';
import { PasswordMother } from '../../shared/mothers/password.mother';

export class CompleteForgotPasswordRequestMother {
	static create(id: string, password: string): CompleteForgotPasswordRequest {
		return { id, password };
	}

	static random(id: string): CompleteForgotPasswordRequest {
		return this.create(id, PasswordMother.random());
	}
}
