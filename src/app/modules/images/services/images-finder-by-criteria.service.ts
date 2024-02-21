import { Inject, Injectable } from '@nestjs/common';

import { imagesConfig } from '../config/images.config';
import { FindImagesByCriteriaRequest } from '../dtos/find-images-by-criteria.request.dto';
import { FindImagesByCriteriaResponse } from '../dtos/find-images-by-criteria-response.dto';
import { ImageCriteriaQuery } from '../dtos/image-criteria-query.dto';
import { ImageRepository } from '../repositories/image.repository';

const { repository } = imagesConfig;
const { repositoryInterface } = repository;

@Injectable()
export class ImagesFinderByCriteria {
	constructor(@Inject(repositoryInterface) private readonly repository: ImageRepository) {}

	async run(request: FindImagesByCriteriaRequest): Promise<FindImagesByCriteriaResponse> {
		const query = ImageCriteriaQuery.create(request);

		const criteriaResult = await this.repository.findByCriteria(query);

		return FindImagesByCriteriaResponse.create(query, criteriaResult);
	}
}
