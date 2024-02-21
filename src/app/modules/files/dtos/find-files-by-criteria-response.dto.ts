import { ApiProperty } from '@nestjs/swagger';

import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { filePropertiesSwagger } from '../config/swagger/properties/file-properties.swagger';
import { FileEntity } from '../persistence/file.entity';
import { FileCriteriaQuery } from '../persistence/file-criteria.query';
import { FindFileByIdResponse } from './find-file-by-id-response.dto';

const { filesCriteria } = filePropertiesSwagger;

export class FindFilesByCriteriaResponse {
	@ApiProperty(filesCriteria)
	readonly data: Array<FindFileByIdResponse>;

	readonly count: number;

	readonly currentCount: number;

	readonly take: number;

	readonly page: number;

	constructor(
		data: Array<FindFileByIdResponse>,
		count: number,
		currentCount: number,
		take: number,
		page: number,
	) {
		this.data = data;
		this.count = count;
		this.currentCount = currentCount;
		this.take = take;
		this.page = page;
	}

	static create(
		query: FileCriteriaQuery,
		criteriaResult: CriteriaResult<FileEntity>,
	): FindFilesByCriteriaResponse {
		const { data, count } = criteriaResult;
		const { take, page } = query;
		const currentCount = data.length;

		const findFileResponseArray = data.map((file) => FindFileByIdResponse.create(file));

		return new FindFilesByCriteriaResponse(findFileResponseArray, count, currentCount, take, page);
	}
}
