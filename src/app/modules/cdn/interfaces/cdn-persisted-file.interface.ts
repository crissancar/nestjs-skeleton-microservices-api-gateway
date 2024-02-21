import { CDNFilePaths } from './cdn-file-paths.interface';

export class CDNPersistedFile {
	relativeDirectory: string;
	filename: string;
	originalName: string;
	url: string;
	size: number;
	mimetype: string;
	paths: CDNFilePaths;
}
