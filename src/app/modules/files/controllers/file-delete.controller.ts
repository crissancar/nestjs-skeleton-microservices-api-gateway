import { Controller, Delete, Param } from '@nestjs/common';

import { DeleteImageResponse } from '../../images/dtos/delete-image-response.dto';
import { EndpointAuthentication } from '../../shared/decorators/endpoint-authentication.decorator';
import { UserAudiences } from '../../shared/enums/user-audiences.enum';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { filesConfig } from '../config/files.config';
import { DeleteFileSwagger } from '../config/swagger/decorators/delete-file-swagger.decorator';
import { FileDeleter } from '../services/file-deleter.service';

const { globalRoute, deleteController } = filesConfig;
const { context, routes, params } = deleteController.constants;
const { requestLog } = deleteController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class FileDeleteController {
	constructor(private readonly deleter: FileDeleter) {}

	@DeleteFileSwagger()
	@EndpointAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@Delete(routes.delete)
	async delete(@Param(params.id) id: string): Promise<DeleteImageResponse> {
		logger.log(requestLog);

		return this.deleter.run({ id });
	}
}
