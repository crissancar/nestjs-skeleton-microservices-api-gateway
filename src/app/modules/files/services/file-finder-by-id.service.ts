import { Inject, Injectable } from '@nestjs/common';

import { filesConfig } from '../config/files.config';
import { FindFileByIdRequest } from '../dtos/find-file-by-id-request.dto';
import { FindFileByIdResponse } from '../dtos/find-file-by-id-response.dto';
import { FileWithIdNotExistsException } from '../exceptions/file-with-id-not-exists.exception';
import { FileRepository } from '../repositories/file.repository';

const { finderById, repository } = filesConfig;
const { repositoryInterface } = repository;
const { context } = finderById.constants;

@Injectable()
export class FileFinderById {
	constructor(@Inject(repositoryInterface) private readonly repository: FileRepository) {}

	async run(request: FindFileByIdRequest): Promise<FindFileByIdResponse> {
		const foundFile = await this.repository.findById(request.id);

		if (!foundFile) {
			throw new FileWithIdNotExistsException(context, request.id);
		}

		return FindFileByIdResponse.create(foundFile);
	}
}
