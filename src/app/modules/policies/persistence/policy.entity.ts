import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TimestampEntity } from '../../shared/persistence/timestamp.entity';
import { policiesConfig } from '../config/policies.config';
import { PolicyLanguages } from '../enums/policy-languages.enum';
import { PolicyTypes } from '../enums/policy-types.enum';

const { entity } = policiesConfig;

@Entity(entity)
export class PolicyEntity extends TimestampEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	title: string;

	@Column({ default: 'File upload from Policy resource' })
	description: string;

	@Column()
	url: string;

	@Column({
		type: 'enum',
		enum: PolicyTypes,
	})
	type: PolicyTypes;

	@Column({
		type: 'enum',
		enum: PolicyLanguages,
		default: PolicyLanguages.ENGLISH,
	})
	language: PolicyLanguages;

	@Column({
		type: 'timestamp',
	})
	effectiveAt: Date;

	constructor(
		id: string,
		title: string,
		description: string,
		url: string,
		type: PolicyTypes,
		language: PolicyLanguages,
		effectiveAt: Date,
	) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.url = url;
		this.type = type;
		this.language = language;
		this.effectiveAt = effectiveAt;
	}

	static create(
		id: string,
		title: string,
		description: string,
		url: string,
		type: PolicyTypes,
		language: PolicyLanguages,
		effectiveAt: Date,
	): PolicyEntity {
		return new PolicyEntity(id, title, description, url, type, language, effectiveAt);
	}
}
