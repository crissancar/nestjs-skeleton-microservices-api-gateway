import { FindOneOptions } from 'typeorm';

import { TypeOrmRepository } from '../../shared/persistence/typeorm.repository';
import { GenericEntityClassOrSchema } from '../../shared/types/generic-entity-class-or-schema.type';
import { Nullable } from '../../shared/types/nullable.type';
import { UserEntity } from '../../users/persistence/user.entity';
import { ForgotPasswordRepository } from '../repositories/forgot-password.repository';
import { ForgotPasswordEntity } from './forgot-password.entity';

export class TypeOrmForgotPasswordRepository
	extends TypeOrmRepository<ForgotPasswordEntity>
	implements ForgotPasswordRepository
{
	async create(forgotPasswordEntity: ForgotPasswordEntity): Promise<ForgotPasswordEntity> {
		return this.persistEntity(forgotPasswordEntity);
	}

	async delete(id: string): Promise<boolean> {
		const { affected } = await this.deleteEntity(id);

		return affected !== 0;
	}

	async find(id: string): Promise<Nullable<ForgotPasswordEntity>> {
		const options = { where: { id }, relations: ['user'] } as FindOneOptions<ForgotPasswordEntity>;

		return this.findOneEntity(options);
	}

	async resolveUser(email: string): Promise<UserEntity> {
		const options = {
			where: { email },
			select: ['id', 'name', 'email'],
		} as FindOneOptions<UserEntity>;

		return this.resolveRelationEntity<UserEntity>(UserEntity, options);
	}

	protected entitySchema(): GenericEntityClassOrSchema<ForgotPasswordEntity> {
		return ForgotPasswordEntity;
	}
}
