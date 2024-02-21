import { Controller, Delete, Param } from '@nestjs/common';

import { EndpointAuthentication } from '../../shared/decorators/endpoint-authentication.decorator';
import { UserAudiences } from '../../shared/enums/user-audiences.enum';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { imagesConfig } from '../config/images.config';
import { DeleteImageSwagger } from '../config/swagger/decorators/delete-image-swagger.decorator';
import { DeleteImageResponse } from '../dtos/delete-image-response.dto';
import { ImageDeleter } from '../services/image-deleter.service';

const { globalRoute, deleteController } = imagesConfig;
const { context, routes, params } = deleteController.constants;
const { requestLog } = deleteController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class ImageDeleteController {
	constructor(private readonly deleter: ImageDeleter) {}

	@DeleteImageSwagger()
	@EndpointAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@Delete(routes.delete)
	async delete(@Param(params.id) id: string): Promise<DeleteImageResponse> {
		logger.log(requestLog);

		return this.deleter.run({ id });
	}
}
