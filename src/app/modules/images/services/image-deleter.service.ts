import { Inject, Injectable } from '@nestjs/common';

import { imagesConfig } from '../config/images.config';
import { DeleteImageRequest } from '../dtos/delete-image-request.dto';
import { DeleteImageResponse } from '../dtos/delete-image-response.dto';
import { ImageWithIdNotExistsException } from '../exceptions/image-with-id-not-exists.exception';
import { ImageRepository } from '../repositories/image.repository';

const { deleter, repository } = imagesConfig;
const { repositoryInterface } = repository;
const { context } = deleter.constants;

@Injectable()
export class ImageDeleter {
	constructor(@Inject(repositoryInterface) private readonly repository: ImageRepository) {}

	async run(request: DeleteImageRequest): Promise<DeleteImageResponse> {
		const deletedImage = await this.repository.delete(request.id);

		if (!deletedImage) {
			throw new ImageWithIdNotExistsException(context, request.id);
		}

		return DeleteImageResponse.create(request.id);
	}
}
