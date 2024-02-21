import { Body, Controller, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';

import { ApiKeyAudiences } from '../../api-keys/enums/api-key-audiences.enum';
import { ApiKeyAuthentication } from '../../shared/decorators/api-key-authentication.decorator';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { forgotPasswordsConfig } from '../config/forgot-passwords.config';
import { CompleteForgotPasswordSwagger } from '../config/swagger/decorators/complete-forgot-password-swagger.decorator';
import { CompleteForgotPasswordRequest } from '../dtos/complete-forgot-password-request.dto';
import { CompleteForgotPasswordResponse } from '../dtos/complete-forgot-password-response.dto';
import { ForgotPasswordCompleter } from '../services/forgot-password-completer.service';

const { putController, globalRoute } = forgotPasswordsConfig;
const { context, routes, params } = putController.constants;
const { requestLog } = putController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class ForgotPasswordPutController {
	constructor(private readonly completer: ForgotPasswordCompleter) {}

	@CompleteForgotPasswordSwagger()
	@ApiKeyAuthentication(ApiKeyAudiences.ADMIN, ApiKeyAudiences.GENERAL)
	@HttpCode(HttpStatus.OK)
	@Put(routes.complete)
	async run(
		@Param(params.id) id: string,
		@Body() request: CompleteForgotPasswordRequest,
	): Promise<CompleteForgotPasswordResponse> {
		logger.log(requestLog);

		return this.completer.run({ ...request, id });
	}
}
