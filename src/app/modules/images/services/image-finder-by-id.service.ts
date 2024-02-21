import { Inject, Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { imagesConfig } from '../config/images.config';
import { FindImageByIdRequest } from '../dtos/find-image-by-id-request.dto';
import { FindImageByIdResponse } from '../dtos/find-image-by-id-response.dto';
import { ImageWithIdNotExistsException } from '../exceptions/image-with-id-not-exists.exception';
import { ImageRepository } from '../repositories/image.repository';

const { finderById, repository } = imagesConfig;
const { repositoryInterface } = repository;
const { context } = finderById.constants;
const { requestLog, responseLog } = finderById.logs;

const logger = LoggerFactory.create(context);

@Injectable()
export class ImageFinderById {
	constructor(@Inject(repositoryInterface) private readonly repository: ImageRepository) {}

	async run(request: FindImageByIdRequest): Promise<FindImageByIdResponse> {
		logger.log(requestLog);

		const foundImage = await this.repository.findById(request.id);

		if (!foundImage) {
			throw new ImageWithIdNotExistsException(context, request.id);
		}

		logger.log(responseLog(foundImage.id));

		return FindImageByIdResponse.create(foundImage);
	}
}
