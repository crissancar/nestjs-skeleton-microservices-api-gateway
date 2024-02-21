import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { usersConfig } from '../config/users.config';
import { UserEvents } from '../enums/user-events.enum';
import { SendCreatedUserMailException } from '../exceptions/send-created-user-mail.exception';
import { UserMailer } from '../mailers/user.mailer';
import { UserEntity } from '../persistence/user.entity';

const { mailSender, mailer } = usersConfig;
const { mailerInterface } = mailer;
const { context } = mailSender.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class UserCreatedMailSender {
	constructor(@Inject(mailerInterface) private readonly mailer: UserMailer) {}

	@OnEvent(UserEvents.CREATED)
	async run(createdUser: UserEntity): Promise<void> {
		try {
			await this.mailer.created(createdUser);
		} catch (error) {
			const exception = new SendCreatedUserMailException(context, createdUser.id);
			logger.error(exception.message);
		}
	}
}
