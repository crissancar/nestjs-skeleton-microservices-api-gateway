import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { ApiKeyAudiences } from '../../api-keys/enums/api-key-audiences.enum';
import { ApiKeyAuthentication } from '../../shared/decorators/api-key-authentication.decorator';
import { UuidGenerator } from '../../shared/decorators/uuid-generator.decorator';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { forgotPasswordsConfig } from '../config/forgot-passwords.config';
import { CreateForgotPasswordSwagger } from '../config/swagger/decorators/create-forgot-password-swagger.decorator';
import { CreateForgotPasswordRequest } from '../dtos/create-forgot-password-request.dto';
import { CreateForgotPasswordResponse } from '../dtos/create-forgot-password-response.dto';
import { ForgotPasswordCreator } from '../services/forgot-password-creator.service';

const { postController, globalRoute } = forgotPasswordsConfig;
const { context } = postController.constants;
const { requestLog } = postController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class ForgotPasswordPostController {
	constructor(private readonly creator: ForgotPasswordCreator) {}

	@CreateForgotPasswordSwagger()
	@ApiKeyAuthentication(ApiKeyAudiences.ADMIN, ApiKeyAudiences.GENERAL)
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async run(
		@UuidGenerator() id: string,
		@Body() request: CreateForgotPasswordRequest,
	): Promise<CreateForgotPasswordResponse> {
		logger.log(requestLog);

		return this.creator.run({ ...request, id });
	}
}
