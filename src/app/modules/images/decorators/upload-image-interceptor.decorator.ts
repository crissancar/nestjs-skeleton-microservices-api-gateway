import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import path from 'path';

import { config } from '../../../../config/app/index';
import { imagesConfig } from '../config/images.config';
import { InvalidImageMimeTypeException } from '../exceptions/invalid-image-mime-type.exception';

const { upload, acceptedMimeTypes } = imagesConfig;
const { PWD } = config;

export const UploadImageInterceptor = (): MethodDecorator =>
	applyDecorators(
		UseInterceptors(
			FileInterceptor('image', {
				fileFilter(
					request: Request,
					image: Express.Multer.File,
					callback: (error: Error | null, acceptFile: boolean) => void,
				) {
					checkMimeType(image, callback);
				},
				storage: diskStorage({
					destination: `${PWD}${upload.path}`,
					filename(
						request: Request,
						file: Express.Multer.File,
						callback: (error: Error | null, filename: string) => void,
					) {
						createFileName(file, callback);
					},
				}),
				limits: { fileSize: upload.size },
			}),
		),
	);

function checkMimeType(
	image: Express.Multer.File,
	callback: (error: Error | null, acceptFile: boolean) => void,
): void {
	if (acceptedMimeTypes.includes(image.mimetype)) {
		callback(null, true);
	} else {
		callback(new InvalidImageMimeTypeException('UploadImageInterceptor'), false);
	}
}

function createFileName(
	image: Express.Multer.File,
	callback: (error: Error | null, filename: string) => void,
): void {
	const uniqueSuffix = `${Date.now()}${Math.round(Math.random() * 1e9)}`;
	const extension = path.extname(image.originalname);
	const fileName = `${uniqueSuffix}${extension}`;

	callback(null, fileName);
}
