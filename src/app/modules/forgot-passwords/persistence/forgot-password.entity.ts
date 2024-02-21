import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { TimestampEntity } from '../../shared/persistence/timestamp.entity';
import { UserEntity } from '../../users/persistence/user.entity';
import { forgotPasswordsConfig } from '../config/forgot-passwords.config';

const { entity } = forgotPasswordsConfig;

@Entity(entity)
export class ForgotPasswordEntity extends TimestampEntity {
	@PrimaryColumn({ update: false })
	id: string;

	@ManyToOne(() => UserEntity, { onDelete: 'SET NULL' })
	user: UserEntity;

	@Column({
		type: 'timestamptz',
		default: () => "NOW() + (10 * interval '1 minute')",
	})
	expiredAt: Date;

	constructor(id: string, user?: UserEntity) {
		super();
		this.id = id;
		this.user = user;
	}

	static create(id: string, userEntity?: UserEntity): ForgotPasswordEntity {
		return new ForgotPasswordEntity(id, userEntity);
	}
}
