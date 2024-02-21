import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import path from 'path';

import { config } from '../../../../config/app/index';
import { filesConfig } from '../config/files.config';
import { InvalidFileMimeTypeException } from '../exceptions/invalid-file-mime-type.exception';

const { upload, acceptedMimeTypes } = filesConfig;
const { PWD } = config;

export const UploadFileInterceptor = (): MethodDecorator =>
	applyDecorators(
		UseInterceptors(
			FileInterceptor('file', {
				fileFilter(
					request: Request,
					file: Express.Multer.File,
					callback: (error: Error | null, acceptFile: boolean) => void,
				) {
					checkMimeType(file, callback);
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
	file: Express.Multer.File,
	callback: (error: Error | null, acceptFile: boolean) => void,
): void {
	if (acceptedMimeTypes.includes(file.mimetype)) {
		callback(null, true);
	} else {
		callback(new InvalidFileMimeTypeException('UploadFileInterceptor'), false);
	}
}

function createFileName(
	file: Express.Multer.File,
	callback: (error: Error | null, filename: string) => void,
): void {
	const uniqueSuffix = `${Date.now()}${Math.round(Math.random() * 1e9)}`;
	const extension = path.extname(file.originalname);
	const fileName = `${uniqueSuffix}${extension}`;

	callback(null, fileName);
}
