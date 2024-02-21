import { ApiProperty } from '@nestjs/swagger';

import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { imagePropertiesSwagger } from '../config/swagger/properties/image-properties.swagger';
import { ImageEntity } from '../persistence/image.entity';
import { FindImageByIdResponse } from './find-image-by-id-response.dto';
import { ImageCriteriaQuery } from './image-criteria-query.dto';

const { imagesCriteria } = imagePropertiesSwagger;

export class FindImagesByCriteriaResponse {
	@ApiProperty(imagesCriteria)
	readonly data: Array<FindImageByIdResponse>;

	readonly count: number;

	readonly currentCount: number;

	readonly take: number;

	readonly page: number;

	constructor(
		data: Array<FindImageByIdResponse>,
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
		query: ImageCriteriaQuery,
		criteriaResult: CriteriaResult<ImageEntity>,
	): FindImagesByCriteriaResponse {
		const { data, count } = criteriaResult;
		const { take, page } = query;
		const currentCount = data.length;

		const findImageResponseArray = data.map((file) => FindImageByIdResponse.create(file));

		return new FindImagesByCriteriaResponse(
			findImageResponseArray,
			count,
			currentCount,
			take,
			page,
		);
	}
}
