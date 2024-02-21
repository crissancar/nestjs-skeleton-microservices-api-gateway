import { ApiProperty } from '@nestjs/swagger';

import { filePropertiesSwagger } from '../config/swagger/properties/file-properties.swagger';
import { FileEntity } from '../persistence/file.entity';

const { id, user, filename, description, title, url, mimetype } = filePropertiesSwagger;

export class FindFileByIdResponse {
	@ApiProperty(id)
	readonly id: string;

	@ApiProperty(user)
	readonly user: string;

	@ApiProperty(filename)
	readonly filename: string;

	@ApiProperty(title)
	readonly title: string;

	@ApiProperty(description)
	readonly description: string;

	@ApiProperty(mimetype)
	readonly mimetype: string;

	@ApiProperty(url)
	readonly url: string;

	constructor(
		id: string,
		user: string,
		filename: string,
		title: string,
		description: string,
		mimetype: string,
		url: string,
	) {
		this.id = id;
		this.user = user;
		this.filename = filename;
		this.title = title;
		this.description = description;
		this.mimetype = mimetype;
		this.url = url;
	}

	static create(foundFile: FileEntity): FindFileByIdResponse {
		const { id, filename, mimetype, title, description, url, userId } = foundFile;

		return new FindFileByIdResponse(id, userId, filename, title, description, mimetype, url);
	}
}
