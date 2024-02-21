import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { forgotPasswordsConfig } from '../config/forgot-passwords.config';
import { CreateForgotPasswordRequest } from '../dtos/create-forgot-password-request.dto';
import { CreateForgotPasswordResponse } from '../dtos/create-forgot-password-response.dto';
import { ForgotPasswordEvents } from '../enums/forgot-password-events.enum';
import { ForgotPasswordFailedException } from '../exceptions/forgot-password-failed.exception';
import { ForgotPasswordEntity } from '../persistence/forgot-password.entity';
import { ForgotPasswordRepository } from '../repositories/forgot-password.repository';

const { creator, repository } = forgotPasswordsConfig;
const { repositoryInterface } = repository;
const { context } = creator.constants;

@Injectable()
export class ForgotPasswordCreator {
	constructor(
		@Inject(repositoryInterface) private readonly repository: ForgotPasswordRepository,
		private readonly emitter: EventEmitter2,
	) {}

	async run(request: CreateForgotPasswordRequest): Promise<CreateForgotPasswordResponse> {
		const createdForgotPassword = await this.createForgotPassword(request);

		this.emitter.emit(ForgotPasswordEvents.CREATED, createdForgotPassword);

		return CreateForgotPasswordResponse.create(createdForgotPassword);
	}

	private async createForgotPassword(
		request: CreateForgotPasswordRequest,
	): Promise<ForgotPasswordEntity> {
		const { id, email } = request;

		const user = await this.repository.resolveUser(email);

		if (!user) {
			throw new ForgotPasswordFailedException(context);
		}

		const forgotPassword = ForgotPasswordEntity.create(id, user);

		const createdForgotPassword = await this.repository.create(forgotPassword);

		return createdForgotPassword;
	}
}
