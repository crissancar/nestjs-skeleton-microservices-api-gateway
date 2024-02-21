import { Inject, Injectable } from '@nestjs/common';

import { CDNDirectories } from '../../cdn/enums/cdn-directories.enum';
import { CDNPersistedFile } from '../../cdn/interfaces/cdn-persisted-file.interface';
import { CDNPersister } from '../../cdn/services/cdn-persister.service';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { filesConfig } from '../config/files.config';
import { CreateFileRequest } from '../dtos/create-file-request.dto';
import { CreateFileResponse } from '../dtos/create-file-response.dto';
import { CreateFileException } from '../exceptions/create-file.exception';
import { FileEntity } from '../persistence/file.entity';
import { FileRepository } from '../repositories/file.repository';

const { creator, repository } = filesConfig;
const { repositoryInterface } = repository;
const { context } = creator.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class FileCreator {
	constructor(
		@Inject(repositoryInterface) private readonly repository: FileRepository,
		private readonly cdnPersister: CDNPersister,
	) {}

	async run(request: CreateFileRequest): Promise<CreateFileResponse> {
		const cdnPersistedFile = this.cdnPersister.run(request.uploadedFile, CDNDirectories.FILES);

		const file = this.createFileModel(request, cdnPersistedFile);

		try {
			const createdFile = await this.repository.create(file);

			return CreateFileResponse.create(createdFile);
		} catch (error) {
			logger.error(error);
			throw new CreateFileException(context);
		}
	}

	private createFileModel(
		request: CreateFileRequest,
		cdnPersistedFile: CDNPersistedFile,
	): FileEntity {
		const { url, relativeDirectory, filename, mimetype, originalName, size } = cdnPersistedFile;
		const { id, title, description, user } = request;
		const { id: userId } = user;

		return FileEntity.create(
			id,
			userId,
			url,
			relativeDirectory,
			filename,
			mimetype,
			originalName,
			title,
			description,
			size,
		);
	}
}
