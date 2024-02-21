import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CDNModule } from '../cdn/cdn.module';
import { filesConfig } from './config/files.config';
import { FileDeleteController } from './controllers/file-delete.controller';
import { FileGetController } from './controllers/file-get.controller';
import { FilePostController } from './controllers/file-post.controller';
import { FileEntity } from './persistence/file.entity';
import { TypeOrmFileRepository } from './persistence/typeorm-file.repository';
import { FileCreator } from './services/file-creator.service';
import { FileDeleter } from './services/file-deleter.service';
import { FileFinderById } from './services/file-finder-by-id.service';
import { FilesFinderByCriteria } from './services/files-finder-by-criteria.service';

const { repositoryInterface } = filesConfig.repository;

@Module({
	imports: [TypeOrmModule.forFeature([FileEntity]), CDNModule],
	controllers: [FilePostController, FileGetController, FileDeleteController],
	providers: [
		FileCreator,
		FileDeleter,
		FileFinderById,
		FilesFinderByCriteria,
		{ provide: repositoryInterface, useClass: TypeOrmFileRepository },
	],
})
export class FilesModule {}
