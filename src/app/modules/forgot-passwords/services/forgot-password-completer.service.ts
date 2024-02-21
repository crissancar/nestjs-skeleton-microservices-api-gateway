import { Injectable } from '@nestjs/common';

import { UserForgotPasswordUpdater } from '../../users/services/user-forgot-password-updater.service';
import { forgotPasswordsConfig } from '../config/forgot-passwords.config';
import { CompleteForgotPasswordRequest } from '../dtos/complete-forgot-password-request.dto';
import { CompleteForgotPasswordResponse } from '../dtos/complete-forgot-password-response.dto';
import { FindForgotPasswordRequest } from '../dtos/find-forgot-password-request.dto';
import { ExpiredForgotPasswordException } from '../exceptions/expired-forgot-password.exception';
import { ForgotPasswordEntity } from '../persistence/forgot-password.entity';
import { ForgotPasswordDeleter } from './forgot-password-deleter.service';
import { ForgotPasswordFinder } from './forgot-password-finder.service';

const { completer } = forgotPasswordsConfig;
const { context } = completer.constants;

@Injectable()
export class ForgotPasswordCompleter {
	constructor(
		private readonly finder: ForgotPasswordFinder,
		private readonly deleter: ForgotPasswordDeleter,
		private readonly userUpdater: UserForgotPasswordUpdater,
	) {}

	async run(request: CompleteForgotPasswordRequest): Promise<CompleteForgotPasswordResponse> {
		const forgotPassword = await this.getForgotPassword(request.id);

		this.checkForgotPasswordExpiration(forgotPassword);

		await this.updateUser(request, forgotPassword);

		await this.deleter.run(request.id);

		return CompleteForgotPasswordResponse.create();
	}

	private async getForgotPassword(id: string): Promise<ForgotPasswordEntity> {
		const request = FindForgotPasswordRequest.create(id);

		return this.finder.run(request);
	}

	private checkForgotPasswordExpiration(forgotPassword: ForgotPasswordEntity): void {
		const currentDate = new Date();

		if (currentDate > forgotPassword.expiredAt) {
			throw new ExpiredForgotPasswordException(context, forgotPassword.id);
		}
	}

	private async updateUser(
		request: CompleteForgotPasswordRequest,
		forgotPassword: ForgotPasswordEntity,
	): Promise<void> {
		const { id } = forgotPassword.user;
		const { password } = request;

		await this.userUpdater.run({ id, password });
	}
}
