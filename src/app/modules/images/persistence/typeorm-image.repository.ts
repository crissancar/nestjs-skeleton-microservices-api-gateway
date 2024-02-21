import { FindOneOptions } from 'typeorm';

import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { TypeOrmRepository } from '../../shared/persistence/typeorm.repository';
import { GenericEntityClassOrSchema } from '../../shared/types/generic-entity-class-or-schema.type';
import { Nullable } from '../../shared/types/nullable.type';
import { ImageCriteriaQuery } from '../dtos/image-criteria-query.dto';
import { ImageRepository } from '../repositories/image.repository';
import { ImageEntity } from './image.entity';

export class TypeOrmImageRepository
	extends TypeOrmRepository<ImageEntity>
	implements ImageRepository
{
	async create(imageEntity: ImageEntity): Promise<ImageEntity> {
		return this.persistEntity(imageEntity);
	}

	async delete(id: string): Promise<boolean> {
		const { affected } = await this.deleteEntity(id);

		return affected !== 0;
	}

	async findById(id: string): Promise<Nullable<ImageEntity>> {
		const options = { where: { id } } as FindOneOptions<ImageEntity>;

		return this.findOneEntity(options);
	}

	async findByCriteria(query: ImageCriteriaQuery): Promise<CriteriaResult<ImageEntity>> {
		const { where, take, skip, sortColumn, sortOrder } = query;

		const builder = this.createTypeOrmQueryBuilder();

		builder.where(where);
		builder.addOrderByColumn(sortColumn, sortOrder);
		builder.pagination(take, skip);

		return builder.executeGetManyAndCount();
	}

	protected entitySchema(): GenericEntityClassOrSchema<ImageEntity> {
		return ImageEntity;
	}
}
