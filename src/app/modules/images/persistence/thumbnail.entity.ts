import { Column } from 'typeorm';

import { ThumbnailInterface } from '../interfaces/thumbnail.interface';

export class ThumbnailEntity implements ThumbnailInterface {
	@Column()
	preset: string;

	@Column()
	name: string;

	@Column()
	publicPath: string;

	@Column()
	fullPath: string;

	@Column()
	url: string;

	@Column()
	width: number;

	@Column()
	height: number;

	@Column()
	size: number;

	@Column()
	format: string;

	constructor(
		preset: string,
		name: string,
		publicPath: string,
		fullPath: string,
		url: string,
		width: number,
		height: number,
		size: number,
		format: string,
	) {
		this.preset = preset;
		this.name = name;
		this.publicPath = publicPath;
		this.fullPath = fullPath;
		this.url = url;
		this.width = width;
		this.height = height;
		this.size = size;
		this.format = format;
	}

	static create(
		preset: string,
		name: string,
		publicPath: string,
		fullPath: string,
		url: string,
		width: number,
		height: number,
		size: number,
		format: string,
	): ThumbnailEntity {
		return new ThumbnailEntity(
			preset,
			name,
			publicPath,
			fullPath,
			url,
			width,
			height,
			size,
			format,
		);
	}
}
