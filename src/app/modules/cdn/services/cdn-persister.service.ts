import { Injectable } from '@nestjs/common';
import fsExtra from 'fs-extra';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { cdnConfig } from '../config/cdn.config';
import { CDNDirectories } from '../enums/cdn-directories.enum';
import { CDNPersistedFile } from '../interfaces/cdn-persisted-file.interface';
import { CDNPathsCreator } from './cdn-paths-creator.service';

const { persister } = cdnConfig;
const { context } = persister.constants;
const { requestLog, responseLog } = persister.logs;

const logger = LoggerFactory.create(context);

@Injectable()
export class CDNPersister {
	constructor(private readonly pathsCreator: CDNPathsCreator) {}

	run(uploadedFile: Express.Multer.File, directory: CDNDirectories): CDNPersistedFile {
		logger.log(requestLog);

		const { filename, path, mimetype, originalname, size } = uploadedFile;

		const paths = this.pathsCreator.run(filename, directory);

		fsExtra.moveSync(path, paths.fullPath);

		logger.log(responseLog(filename));

		return {
			relativeDirectory: paths.publicPath,
			filename,
			originalName: originalname,
			url: paths.url,
			size,
			mimetype,
			paths,
		};
	}
}
