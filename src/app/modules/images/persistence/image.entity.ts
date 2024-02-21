import { Column, Entity, PrimaryColumn } from 'typeorm';

import { TimestampEntity } from '../../shared/persistence/timestamp.entity';
import { imagesConfig } from '../config/images.config';
import { ThumbnailsInterface } from '../interfaces/thumbnails.interface';
import { ThumbnailEntity } from './thumbnail.entity';

const { entity } = imagesConfig;

@Entity(entity)
export class ImageEntity extends TimestampEntity {
	@PrimaryColumn({ update: false })
	id: string;

	@Column()
	name: string;

	@Column(() => ThumbnailEntity)
	original: ThumbnailEntity;

	@Column()
	profile: string;

	@Column({ type: 'jsonb' })
	thumbnails: ThumbnailsInterface;

	constructor(
		id: string,
		name: string,
		original: ThumbnailEntity,
		profile: string,
		thumbnails: ThumbnailsInterface,
	) {
		super();
		this.id = id;
		this.name = name;
		this.original = original;
		this.profile = profile;
		this.thumbnails = thumbnails;
	}

	static create(
		id: string,
		name: string,
		original: ThumbnailEntity,
		profile: string,
		thumbnails: ThumbnailsInterface,
	): ImageEntity {
		return new ImageEntity(id, name, original, profile, thumbnails);
	}
}
