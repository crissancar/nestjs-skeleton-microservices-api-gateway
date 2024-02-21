import { Body, Controller, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';

import { AuthUser } from '../../auth/decorators/auth-user.decorator';
import { AuthenticatedUser } from '../../auth/dtos/authenticated-user.dto';
import { EndpointOwnerAuthentication } from '../../shared/decorators/endpoint-owner-authentication.decorator';
import { UserAudiences } from '../../shared/enums/user-audiences.enum';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { UpdateUserPasswordSwagger } from '../config/swagger/decorators/update-password-swagger.decorator';
import { UpdateUserSwagger } from '../config/swagger/decorators/update-user-swagger.decorator';
import { usersConfig } from '../config/users.config';
import { UpdateUserPasswordRequest } from '../dtos/update-user-password-request.dto';
import { UpdateUserRequest } from '../dtos/update-user-request.dto';
import { UpdateUserResponse } from '../dtos/update-user-response.dto';
import { UserPasswordUpdater } from '../services/user-password-updater.service';
import { UserUpdater } from '../services/user-updater.service';

const { globalRoute, putController } = usersConfig;
const { context, routes, param } = putController.constants;
const { requestLog } = putController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class UserPutController {
	constructor(
		private readonly userUpdater: UserUpdater,
		private readonly userPasswordUpdater: UserPasswordUpdater,
	) {}

	@UpdateUserSwagger()
	@EndpointOwnerAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@HttpCode(HttpStatus.CREATED)
	@Put(routes.updateUser)
	async updateUser(
		@Param(param) id: string,
		@Body() request: UpdateUserRequest,
	): Promise<UpdateUserResponse> {
		logger.log(requestLog);

		return this.userUpdater.run({ ...request, id });
	}

	@UpdateUserPasswordSwagger()
	// @EndpointOwnerAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@HttpCode(HttpStatus.CREATED)
	@Put(routes.updateUserPassword)
	async updateUserPassword(
		@Param(param) id: string,
		@Body() request: UpdateUserPasswordRequest,
		@AuthUser() authUser: AuthenticatedUser,
	): Promise<UpdateUserResponse> {
		logger.log(requestLog);

		return this.userPasswordUpdater.run({ ...request, id, authUser });
	}
}
