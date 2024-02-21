import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';

import { EndpointOwnerAuthentication } from '../../shared/decorators/endpoint-owner-authentication.decorator';
import { UserAudiences } from '../../shared/enums/user-audiences.enum';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { DeleteUserSwagger } from '../config/swagger/decorators/delete-user-swagger.decorator';
import { SoftDeleteUserSwagger } from '../config/swagger/decorators/soft-delete-user-swagger.decorator';
import { usersConfig } from '../config/users.config';
import { DeleteUserResponse } from '../dtos/delete-user-response.dto';
import { SoftDeleteUserResponse } from '../dtos/soft-delete-user-response.dto';
import { UserDeleter } from '../services/user-deleter.service';
import { UserSoftDeleter } from '../services/user-soft-deleter.service';

const { globalRoute, deleteController } = usersConfig;
const { context, routes, params } = deleteController.constants;
const { softDelete, deleteUser } = deleteController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class UserDeleteController {
	constructor(
		private readonly deleter: UserDeleter,
		private readonly softDeleter: UserSoftDeleter,
	) {}

	@DeleteUserSwagger()
	@EndpointOwnerAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@HttpCode(HttpStatus.OK)
	@Delete(routes.delete)
	async delete(@Param(params.id) id: string): Promise<DeleteUserResponse> {
		logger.log(deleteUser.requestLog);

		return this.deleter.run({ id });
	}

	@SoftDeleteUserSwagger()
	@EndpointOwnerAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@HttpCode(HttpStatus.OK)
	@Delete(routes.softDelete)
	async softDelete(@Param(params.id) id: string): Promise<SoftDeleteUserResponse> {
		logger.log(softDelete.requestLog);

		return this.softDeleter.run({ id });
	}
}
