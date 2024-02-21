import { DynamicData } from '../../shared/interfaces/dynamic-data.interface';
import { SendgridSendMailRequest } from '../../shared/mailers/dtos/sendgrid-send-mail-request.dto';
import { SendgridMailer } from '../../shared/mailers/sendgrid.mailer';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { UserEntity } from '../../users/persistence/user.entity';
import { forgotPasswordsConfig } from '../config/forgot-passwords.config';
import { ForgotPasswordMailer } from '../interfaces/forgot-password.mailer';
import { ForgotPasswordEntity } from '../persistence/forgot-password.entity';

const { sendgridMailer } = forgotPasswordsConfig;
const { context, from } = sendgridMailer.constants;
const { created } = sendgridMailer.logs;
const { forgotPasswordTemplate } = sendgridMailer.templates;

const logger = LoggerFactory.create(context);

export class SendgridForgotPasswordMailer extends SendgridMailer implements ForgotPasswordMailer {
	async created(createdForgotPassword: ForgotPasswordEntity): Promise<void> {
		logger.log(created.requestLog);

		const { user } = createdForgotPassword;
		const { name: userName } = user;
		const { templateId, message, subject } = forgotPasswordTemplate;

		const dynamicTemplateData = { message, subject, userName } as DynamicData;

		await this.sendMail(user, templateId, dynamicTemplateData);
	}

	private async sendMail(
		user: UserEntity,
		templateId: string,
		dynamicTemplateData: DynamicData,
	): Promise<void> {
		const { email: to } = user;

		const request = SendgridSendMailRequest.create(from, to, templateId, dynamicTemplateData);

		await this.send(request);
	}
}
