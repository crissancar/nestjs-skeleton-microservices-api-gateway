import { Column, Entity, PrimaryColumn } from 'typeorm';

import { TimestampEntity } from '../../shared/persistence/timestamp.entity';
import { examplesConfig } from '../config/examples.config';

const { entity } = examplesConfig;

@Entity(entity)
export class ExampleEntity extends TimestampEntity {
	@PrimaryColumn({ update: false })
	id: string;

	@Column({ unique: true })
	name: string;

	constructor(id: string, name: string) {
		super();
		this.id = id;
		this.name = name;
	}

	static create(id: string, name: string): ExampleEntity {
		return new ExampleEntity(id, name);
	}
}
