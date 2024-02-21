import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TimestampEntity } from '../../shared/persistence/timestamp.entity';
import { adminUsersConfig } from '../config/admin-users.config';
import { AdminUserAudiences } from '../enums/admin-user-audiences.enum';

const { entity } = adminUsersConfig;

@Entity(entity)
export class AdminUserEntity extends TimestampEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({
		type: 'enum',
		enum: AdminUserAudiences,
		default: AdminUserAudiences.GENERAL,
	})
	audience: AdminUserAudiences;

	constructor(name: string, email: string, password: string, audience: AdminUserAudiences) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.audience = audience;
	}

	static create(
		name: string,
		email: string,
		password: string,
		audience: AdminUserAudiences,
	): AdminUserEntity {
		return new AdminUserEntity(name, email, password, audience);
	}
}
