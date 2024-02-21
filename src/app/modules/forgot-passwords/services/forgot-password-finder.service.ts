import { Inject, Injectable } from '@nestjs/common';

import { forgotPasswordsConfig } from '../config/forgot-passwords.config';
import { FindForgotPasswordRequest } from '../dtos/find-forgot-password-request.dto';
import { ForgotPasswordNotExistsException } from '../exceptions/forgot-password-not-exists.exception';
import { ForgotPasswordEntity } from '../persistence/forgot-password.entity';
import { ForgotPasswordRepository } from '../repositories/forgot-password.repository';

const { finder, repository } = forgotPasswordsConfig;
const { repositoryInterface } = repository;
const { context } = finder.constants;

@Injectable()
export class ForgotPasswordFinder {
	constructor(@Inject(repositoryInterface) private readonly repository: ForgotPasswordRepository) {}

	async run(request: FindForgotPasswordRequest): Promise<ForgotPasswordEntity> {
		const foundForgotPassword = await this.repository.find(request.id);

		if (!foundForgotPassword) {
			throw new ForgotPasswordNotExistsException(context, request.id);
		}

		return foundForgotPassword;
	}
}
