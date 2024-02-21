import { Inject, Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { forgotPasswordsConfig } from '../config/forgot-passwords.config';
import { DeleteForgotPasswordException } from '../exceptions/delete-forgot-password.exception';
import { ForgotPasswordRepository } from '../repositories/forgot-password.repository';

const { deleter, repository } = forgotPasswordsConfig;
const { repositoryInterface } = repository;
const { context } = deleter.constants;
const { requestLog, responseLog } = deleter.logs;

const logger = LoggerFactory.create(context);

@Injectable()
export class ForgotPasswordDeleter {
	constructor(@Inject(repositoryInterface) private readonly repository: ForgotPasswordRepository) {}

	async run(id: string): Promise<void> {
		logger.log(requestLog);

		const result = await this.repository.delete(id);

		if (!result) {
			throw new DeleteForgotPasswordException(context, id);
		}

		logger.log(responseLog(id));
	}
}
