import { Inject, Injectable } from '@nestjs/common';
import sharp from 'sharp';

import { CDNDirectories } from '../../cdn/enums/cdn-directories.enum';
import { CDNPersistedFile } from '../../cdn/interfaces/cdn-persisted-file.interface';
import { CDNPersister } from '../../cdn/services/cdn-persister.service';
import { CreateFileException } from '../../files/exceptions/create-file.exception';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { imagesConfig } from '../config/images.config';
import { CreateImageRequest } from '../dtos/create-image-request.dto';
import { CreateImageResponse } from '../dtos/create-image-response.dto';
import { CreateImageThumbnailsException } from '../exceptions/create-image-thumbnails.exception';
import { ThumbnailsInterface } from '../interfaces/thumbnails.interface';
import { ImageEntity } from '../persistence/image.entity';
import { ThumbnailEntity } from '../persistence/thumbnail.entity';
import { ImageRepository } from '../repositories/image.repository';
import { ImageThumbnailsCreator } from './image-thumbnails-creator.service';

const { creator, repository } = imagesConfig;
const { repositoryInterface } = repository;
const { context } = creator.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class ImageCreator {
	constructor(
		@Inject(repositoryInterface) private readonly repository: ImageRepository,
		private readonly cdnPersister: CDNPersister,
		private readonly thumbnailsCreator: ImageThumbnailsCreator,
	) {}

	async run(request: CreateImageRequest): Promise<CreateImageResponse> {
		const cdnPersistedImage = this.persistImageInCDN(request);

		const metadata = await sharp(cdnPersistedImage.paths.fullPath).metadata();

		const original = this.createOriginalThumbnail(cdnPersistedImage, metadata);

		const imageThumbnails = await this.createImageThumbnails(request, cdnPersistedImage);

		const image = this.createImageModel(request, original, imageThumbnails);

		try {
			const createdImage = await this.repository.create(image);

			return CreateImageResponse.create(createdImage);
		} catch (error) {
			logger.error(error);
			throw new CreateFileException(context);
		}
	}

	private createImageModel(
		request: CreateImageRequest,
		original: ThumbnailEntity,
		imageThumbnails: ThumbnailsInterface,
	): ImageEntity {
		const { id, profile, name } = request;

		return ImageEntity.create(id, name, original, profile, imageThumbnails);
	}

	private createOriginalThumbnail(
		cdnPersistedImage: CDNPersistedFile,
		metadata: sharp.Metadata,
	): ThumbnailEntity {
		const { filename, paths } = cdnPersistedImage;
		const { publicPath, fullPath, url } = paths;
		const { width, height, size, format } = metadata;

		return ThumbnailEntity.create(
			'original',
			filename,
			publicPath,
			fullPath,
			url,
			width,
			height,
			size ? size : 0,
			format,
		);
	}

	private persistImageInCDN(request: CreateImageRequest): CDNPersistedFile {
		const { uploadedFile } = request;

		return this.cdnPersister.run(uploadedFile, CDNDirectories.IMAGES);
	}

	private async createImageThumbnails(
		request: CreateImageRequest,
		cdnPersistedImage: CDNPersistedFile,
	): Promise<ThumbnailsInterface> {
		try {
			const thumbnailsProfile = imagesConfig.profiles[request.profile] as object;

			return this.thumbnailsCreator.run(cdnPersistedImage, thumbnailsProfile);
		} catch (error) {
			logger.error(error);
			throw new CreateImageThumbnailsException(context);
		}
	}
}
