import { CreateForgotPasswordRequest } from '../../../../../src/app/modules/forgot-passwords/dtos/create-forgot-password-request.dto';
import { UuidMother } from '../../shared/mothers/uuid.mother';

export class CreateForgotPasswordRequestMother {
	static create(id: string, email: string): CreateForgotPasswordRequest {
		return { id, email };
	}

	static random(email: string): CreateForgotPasswordRequest {
		return this.create(UuidMother.random(), email);
	}
}
