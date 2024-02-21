import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { mkdirp } from 'mkdirp';
import path from 'path';

import { config } from '../../../../config/app/index';
import { CDNDirectories } from '../enums/cdn-directories.enum';
import { CDNFilePaths } from '../interfaces/cdn-file-paths.interface';

const { cdn } = config;

@Injectable()
export class CDNPathsCreator {
	run(filename: string, directory: CDNDirectories): CDNFilePaths {
		const today: Date = new Date();

		const baseURL =
			(+cdn.port === 443 ? 'https://' : 'http://') +
			cdn.url +
			(+cdn.port === 443 || +cdn.port === 80 ? '' : `:${cdn.port}`);

		const publicPath = path.join(
			path.sep,
			directory,
			today.getFullYear().toString(),
			(today.getMonth() + 1).toString(),
		);

		const fullPath = path.join(config.PWD, config.cdn.path, publicPath);

		const url = `${baseURL}${publicPath}`;

		try {
			fs.statSync(fullPath);
		} catch (e) {
			mkdirp.sync(fullPath);
		}

		if (filename) {
			const publicPathWithFilename = path.join(publicPath, filename);

			const fullPathWithFilename = path.join(fullPath, filename);

			const urlWithFilename = url + path.sep + filename;

			return {
				publicPath: publicPathWithFilename,
				fullPath: fullPathWithFilename,
				url: urlWithFilename,
			};
		}

		return { publicPath, fullPath, url };
	}
}
