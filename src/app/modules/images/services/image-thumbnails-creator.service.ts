import { Injectable } from '@nestjs/common';
import path from 'path';
import sharp from 'sharp';

import { CDNDirectories } from '../../cdn/enums/cdn-directories.enum';
import { CDNPersistedFile } from '../../cdn/interfaces/cdn-persisted-file.interface';
import { CDNPathsCreator } from '../../cdn/services/cdn-paths-creator.service';
import { CDNPersister } from '../../cdn/services/cdn-persister.service';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { imagesConfig } from '../config/images.config';
import { ThumbnailInterface } from '../interfaces/thumbnail.interface';
import { ThumbnailsInterface } from '../interfaces/thumbnails.interface';

const { thumbnailsCreator } = imagesConfig;
const { context } = thumbnailsCreator.constants;
const { requestLog, responseLog } = thumbnailsCreator.logs;

const logger = LoggerFactory.create(context);

@Injectable()
export class ImageThumbnailsCreator {
	constructor(
		private readonly cdnPersister: CDNPersister,
		private readonly cdnPathsCreator: CDNPathsCreator,
	) {}

	async run(
		uploadedImage: CDNPersistedFile,
		thumbnailsProfile: object,
	): Promise<ThumbnailsInterface> {
		logger.log(requestLog);

		const thumbnails: ThumbnailsInterface = {};
		for (const [key, value] of Object.entries(thumbnailsProfile)) {
			// eslint-disable-next-line no-await-in-loop
			const result = await this.createThumbnail(uploadedImage, key, value);
			thumbnails[result.preset] = result;
		}

		logger.log(responseLog(uploadedImage.filename));

		return thumbnails;
	}

	private async createThumbnail(
		originalImage: CDNPersistedFile,
		preset,
		settings,
	): Promise<ThumbnailInterface> {
		const settingsFormat = settings.format as string;
		const extension =
			typeof settings.format === 'string'
				? `.${settingsFormat}`
				: path.extname(originalImage.filename);

		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		const filename = `${originalImage.filename.split('.')[0]}.${preset}${extension}`;

		const paths = this.cdnPathsCreator.run(filename, CDNDirectories.IMAGES);

		const finalSettings = {
			autoOrient: false,
			greyscale: false,
			resize: {
				width: 100,
				height: 100,
				fit: settings.resize.fit,
				position: settings.resize.position,
			},
		};

		try {
			const result = await this.imageTransform(
				originalImage.paths.fullPath,
				paths.fullPath,
				finalSettings,
			);

			return {
				preset,
				name: filename,
				size: result.size,
				publicPath: paths.publicPath,
				fullPath: paths.fullPath,
				url: paths.url,
				width: result.width,
				height: result.height,
				format: result.format,
			} as ThumbnailInterface;
		} catch (error) {
			logger.error(error);

			return Promise.reject('app.something-fail-creating-thumbnails');
		}
	}

	private async imageTransform(
		originalImage: string,
		finalImage: string,
		settings,
	): Promise<sharp.OutputInfo> {
		let image = sharp(originalImage);
		if (settings.autoOrient === true) {
			image = image.greyscale();
		}

		if (settings.greyscale === true) {
			image = image.greyscale();
		}

		if (typeof settings.resize === 'object') {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			image = image.resize(settings.resize);
		}

		return image.toFile(finalImage);
	}
}
