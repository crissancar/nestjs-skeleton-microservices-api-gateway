import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { forgotPasswordsConfig } from '../config/forgot-passwords.config';
import { ForgotPasswordEvents } from '../enums/forgot-password-events.enum';
import { SendCreatedForgotPasswordMailException } from '../exceptions/send-created-forgot-password-mail.exception';
import { ForgotPasswordMailer } from '../interfaces/forgot-password.mailer';
import { ForgotPasswordEntity } from '../persistence/forgot-password.entity';

const { mailSender, mailer } = forgotPasswordsConfig;
const { mailerInterface } = mailer;
const { context } = mailSender.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class ForgotPasswordMailSender {
	constructor(@Inject(mailerInterface) private readonly mailer: ForgotPasswordMailer) {}

	@OnEvent(ForgotPasswordEvents.CREATED)
	async run(createdForgotPassword: ForgotPasswordEntity): Promise<void> {
		try {
			await this.mailer.created(createdForgotPassword);
		} catch (error) {
			const exception = new SendCreatedForgotPasswordMailException(
				context,
				createdForgotPassword.id,
			);
			logger.error(exception.message);
		}
	}
}
