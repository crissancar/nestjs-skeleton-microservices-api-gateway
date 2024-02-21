import { FindOneOptions } from 'typeorm';

import { TypeOrmRepository } from '../../../shared/persistence/typeorm.repository';
import { GenericEntityClassOrSchema } from '../../../shared/types/generic-entity-class-or-schema.type';
import { Nullable } from '../../../shared/types/nullable.type';
import { BlacklistIPRepository } from '../repositories/blacklist-ip.repository';
import { BlacklistIPEntity } from './blacklist-ip.entity';

export class TypeOrmBlacklistIPRepository
	extends TypeOrmRepository<BlacklistIPEntity>
	implements BlacklistIPRepository
{
	async find(ip: string): Promise<Nullable<BlacklistIPEntity>> {
		const options = { where: { ip } } as FindOneOptions<BlacklistIPEntity>;

		return this.findOneEntity(options);
	}

	protected entitySchema(): GenericEntityClassOrSchema<BlacklistIPEntity> {
		return BlacklistIPEntity;
	}
}
