import { FindUserByEmailRequest } from '../../../../../src/app/modules/users/dtos/find-user-by-email-request.dto';
import { EmailMother } from '../../shared/mothers/email.mother';

export class FindUserByEmailRequestMother {
	static create(email: string): FindUserByEmailRequest {
		return { email };
	}

	static random(): FindUserByEmailRequest {
		return this.create(EmailMother.random());
	}
}
