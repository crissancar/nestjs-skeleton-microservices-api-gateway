import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { TimestampEntity } from '../../shared/persistence/timestamp.entity';
import { UserEntity } from '../../users/persistence/user.entity';
import { filesConfig } from '../config/files.config';

const { entity } = filesConfig;

@Entity(entity)
export class FileEntity extends TimestampEntity {
	@PrimaryColumn({ update: false })
	id: string;

	@Column()
	url: string;

	@Column()
	relativeDirectory: string;

	@Column()
	filename: string;

	@Column()
	mimetype: string;

	@Column()
	originalName: string;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	size: string;

	@Column()
	userId: string;

	@ManyToOne(() => UserEntity, { onDelete: 'SET NULL' })
	user?: UserEntity;

	constructor(
		id: string,
		userId: string,
		url: string,
		relativeDirectory: string,
		filename: string,
		mimetype: string,
		originalName: string,
		title: string,
		description: string,
		size: string,
	) {
		super();
		this.id = id;
		this.userId = userId;
		this.url = url;
		this.relativeDirectory = relativeDirectory;
		this.filename = filename;
		this.mimetype = mimetype;
		this.originalName = originalName;
		this.title = title;
		this.description = description;
		this.size = size;
	}

	static create(
		id: string,
		userId: string,
		url: string,
		relativeDirectory: string,
		filename: string,
		mimetype: string,
		originalName: string,
		title: string,
		description: string,
		size: number,
	): FileEntity {
		return new FileEntity(
			id,
			userId,
			url,
			relativeDirectory,
			filename,
			mimetype,
			originalName,
			title,
			description,
			String(size),
		);
	}
}
