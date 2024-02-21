import { Inject, Injectable } from '@nestjs/common';

import { filesConfig } from '../config/files.config';
import { FindFilesByCriteriaRequest } from '../dtos/find-files-by-criteria.request.dto';
import { FindFilesByCriteriaResponse } from '../dtos/find-files-by-criteria-response.dto';
import { FileCriteriaQuery } from '../persistence/file-criteria.query';
import { FileRepository } from '../repositories/file.repository';

const { repository } = filesConfig;
const { repositoryInterface } = repository;

@Injectable()
export class FilesFinderByCriteria {
	constructor(@Inject(repositoryInterface) private readonly repository: FileRepository) {}

	async run(request: FindFilesByCriteriaRequest): Promise<FindFilesByCriteriaResponse> {
		const query = FileCriteriaQuery.create(request);

		const criteriaResult = await this.repository.findByCriteria(query);

		return FindFilesByCriteriaResponse.create(query, criteriaResult);
	}
}
