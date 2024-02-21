import { ApiProperty } from '@nestjs/swagger';

import { imagePropertiesSwagger } from '../config/swagger/properties/image-properties.swagger';
import { ThumbnailsInterface } from '../interfaces/thumbnails.interface';
import { ImageEntity } from '../persistence/image.entity';
import { ThumbnailEntity } from '../persistence/thumbnail.entity';

const { id, name, original, thumbnails } = imagePropertiesSwagger;

export class CreateImageResponse {
	@ApiProperty(id)
	readonly id: string;

	@ApiProperty(name)
	readonly name: string;

	@ApiProperty(original)
	readonly original: ThumbnailEntity;

	@ApiProperty(thumbnails)
	readonly thumbnails: ThumbnailsInterface;

	constructor(
		id: string,
		name: string,
		original: ThumbnailEntity,
		thumbnails: ThumbnailsInterface,
	) {
		this.id = id;
		this.name = name;
		this.original = original;
		this.thumbnails = thumbnails;
	}

	static create(createdFile: ImageEntity): CreateImageResponse {
		const { id, name, original, thumbnails } = createdFile;

		return new CreateImageResponse(id, name, original, thumbnails);
	}
}
