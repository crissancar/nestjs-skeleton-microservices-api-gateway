import { Inject, Injectable } from '@nestjs/common';

import { filesConfig } from '../config/files.config';
import { DeleteFileRequest } from '../dtos/delete-file-request.dto';
import { DeleteFileResponse } from '../dtos/delete-file-response.dto';
import { FileWithIdNotExistsException } from '../exceptions/file-with-id-not-exists.exception';
import { FileRepository } from '../repositories/file.repository';

const { deleter, repository } = filesConfig;
const { repositoryInterface } = repository;
const { context } = deleter.constants;

@Injectable()
export class FileDeleter {
	constructor(@Inject(repositoryInterface) private readonly repository: FileRepository) {}

	async run(request: DeleteFileRequest): Promise<DeleteFileResponse> {
		const deletedFile = await this.repository.delete(request.id);

		if (!deletedFile) {
			throw new FileWithIdNotExistsException(context, request.id);
		}

		return DeleteFileResponse.create(request.id);
	}
}
