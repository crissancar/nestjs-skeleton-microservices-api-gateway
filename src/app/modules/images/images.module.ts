import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CDNModule } from '../cdn/cdn.module';
import { imagesConfig } from './config/images.config';
import { ImageDeleteController } from './controllers/image-delete.controller';
import { ImageGetController } from './controllers/image-get.controller';
import { ImagePostController } from './controllers/image-post.controller';
import { ImageEntity } from './persistence/image.entity';
import { TypeOrmImageRepository } from './persistence/typeorm-image.repository';
import { ImageCreator } from './services/image-creator.service';
import { ImageDeleter } from './services/image-deleter.service';
import { ImageFinderById } from './services/image-finder-by-id.service';
import { ImageThumbnailsCreator } from './services/image-thumbnails-creator.service';
import { ImagesFinderByCriteria } from './services/images-finder-by-criteria.service';

const { repositoryInterface } = imagesConfig.repository;

@Module({
	controllers: [ImagePostController, ImageGetController, ImageDeleteController],
	imports: [TypeOrmModule.forFeature([ImageEntity]), CDNModule],
	providers: [
		ImageCreator,
		ImageDeleter,
		ImagesFinderByCriteria,
		ImageFinderById,
		ImageThumbnailsCreator,
		{ provide: repositoryInterface, useClass: TypeOrmImageRepository },
	],
})
export class ImagesModule {}
