import { ApiProperty } from '@nestjs/swagger';

import { filePropertiesSwagger } from '../config/swagger/properties/file-properties.swagger';
import { FileEntity } from '../persistence/file.entity';

const { id, size, filename, description, title, url, mimetype } = filePropertiesSwagger;

export class CreateFileResponse {
	@ApiProperty(id)
	readonly id: string;

	@ApiProperty(filename)
	readonly filename: string;

	@ApiProperty(title)
	readonly title: string;

	@ApiProperty(description)
	readonly description: string;

	@ApiProperty(mimetype)
	readonly mimetype: string;

	@ApiProperty(size)
	readonly size: string;

	@ApiProperty(url)
	readonly url: string;

	constructor(
		id: string,
		filename: string,
		title: string,
		description: string,
		mimetype: string,
		size: string,
		url: string,
	) {
		this.id = id;
		this.filename = filename;
		this.title = title;
		this.description = description;
		this.mimetype = mimetype;
		this.size = size;
		this.url = url;
	}

	static create(createdFile: FileEntity): CreateFileResponse {
		const { id, filename, mimetype, title, description, url, size } = createdFile;

		return new CreateFileResponse(id, filename, title, description, mimetype, size, url);
	}
}
