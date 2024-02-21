import { Body, Controller, Post, UploadedFile } from '@nestjs/common';

import { AuthUser } from '../../auth/decorators/auth-user.decorator';
import { AuthenticatedUser } from '../../auth/dtos/authenticated-user.dto';
import { EndpointAuthentication } from '../../shared/decorators/endpoint-authentication.decorator';
import { UuidGenerator } from '../../shared/decorators/uuid-generator.decorator';
import { UserAudiences } from '../../shared/enums/user-audiences.enum';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { UserEntity } from '../../users/persistence/user.entity';
import { imagesConfig } from '../config/images.config';
import { CreateImageSwagger } from '../config/swagger/decorators/create-image-swagger.decorator';
import { UploadImageInterceptor } from '../decorators/upload-image-interceptor.decorator';
import { CreateImageRequest } from '../dtos/create-image-request.dto';
import { CreateImageResponse } from '../dtos/create-image-response.dto';
import { UndefinedImageException } from '../exceptions/undefined-image.exception';
import { ImageCreator } from '../services/image-creator.service';

const { globalRoute, postController } = imagesConfig;
const { context } = postController.constants;
const { requestLog } = postController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class ImagePostController {
	constructor(private readonly creator: ImageCreator) {}

	@CreateImageSwagger()
	@EndpointAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@UploadImageInterceptor()
	@Post()
	async create(
		@UuidGenerator() id: string,
		@AuthUser() authUser: AuthenticatedUser,
		@UploadedFile() uploadedFile: Express.Multer.File,
		@Body() request: CreateImageRequest,
	): Promise<CreateImageResponse> {
		logger.log(requestLog);

		if (!uploadedFile) {
			throw new UndefinedImageException(context);
		}

		const user = authUser as UserEntity;
		const name = request.name ? request.name : uploadedFile.filename;

		return this.creator.run({
			...request,
			id,
			uploadedFile,
			user,
			name,
		});
	}
}
