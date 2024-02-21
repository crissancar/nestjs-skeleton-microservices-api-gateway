import { config } from '../../../../config/app';
import { DynamicData } from '../../shared/interfaces/dynamic-data.interface';
import { SendgridSendMailRequest } from '../../shared/mailers/dtos/sendgrid-send-mail-request.dto';
import { SendgridMailer } from '../../shared/mailers/sendgrid.mailer';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { usersConfig } from '../config/users.config';
import { UserEntity } from '../persistence/user.entity';
import { UserMailer } from './user.mailer';

const { redirectUrls } = config.sendgrid;
const { sendgridMailer } = usersConfig;
const { context, from } = sendgridMailer.constants;
const { created } = sendgridMailer.logs;
const { createdTemplate } = sendgridMailer.templates;

const logger = LoggerFactory.create(context);

export class SendgridUserMailer extends SendgridMailer implements UserMailer {
	async created(user: UserEntity): Promise<void> {
		logger.log(created.requestLog);

		const { templateId } = createdTemplate;

		const dynamicTemplateData = {
			redirectUrl: redirectUrls.welcome,
		} as DynamicData;

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
