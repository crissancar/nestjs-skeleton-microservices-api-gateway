import { Body, Controller, Post, UploadedFile } from '@nestjs/common';

import { AuthUser } from '../../auth/decorators/auth-user.decorator';
import { AuthenticatedUser } from '../../auth/dtos/authenticated-user.dto';
import { EndpointAuthentication } from '../../shared/decorators/endpoint-authentication.decorator';
import { UuidGenerator } from '../../shared/decorators/uuid-generator.decorator';
import { UserAudiences } from '../../shared/enums/user-audiences.enum';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { UserEntity } from '../../users/persistence/user.entity';
import { filesConfig } from '../config/files.config';
import { CreateFileSwagger } from '../config/swagger/decorators/create-file-swagger.decorator';
import { UploadFileInterceptor } from '../decorators/upload-file-interceptor.decorator';
import { CreateFileRequest } from '../dtos/create-file-request.dto';
import { CreateFileResponse } from '../dtos/create-file-response.dto';
import { UndefinedFileException } from '../exceptions/undefined-file.exception';
import { FileCreator } from '../services/file-creator.service';

const { globalRoute, postController } = filesConfig;
const { context } = postController.constants;
const { requestLog } = postController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class FilePostController {
	constructor(private readonly creator: FileCreator) {}

	@CreateFileSwagger()
	@EndpointAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@UploadFileInterceptor()
	@Post()
	async create(
		@UuidGenerator() id: string,
		@AuthUser() authUser: AuthenticatedUser,
		@UploadedFile() uploadedFile: Express.Multer.File,
		@Body() request: CreateFileRequest,
	): Promise<CreateFileResponse> {
		logger.log(requestLog);

		if (!uploadedFile) {
			throw new UndefinedFileException(context);
		}

		const user = authUser as UserEntity;

		return this.creator.run({ ...request, id, user, uploadedFile });
	}
}
