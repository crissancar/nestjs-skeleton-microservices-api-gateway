import { FindOneOptions } from 'typeorm';

import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { TypeOrmRepository } from '../../shared/persistence/typeorm.repository';
import { GenericEntityClassOrSchema } from '../../shared/types/generic-entity-class-or-schema.type';
import { Nullable } from '../../shared/types/nullable.type';
import { UpdateExampleRequest } from '../dtos/update-example-request.dto';
import { ExampleRepository } from '../repositories/example.repository';
import { ExampleEntity } from './example.entity';
import { ExampleCriteriaQuery } from './example-criteria.query';

export class TypeOrmExampleRepository
	extends TypeOrmRepository<ExampleEntity>
	implements ExampleRepository
{
	async create(exampleEntity: ExampleEntity): Promise<ExampleEntity> {
		return this.persistEntity(exampleEntity);
	}

	async update(id: string, request: UpdateExampleRequest): Promise<ExampleEntity> {
		const { affected } = await this.persistPartialEntity(id, request);

		return affected === 1 ? this.findById(id) : null;
	}

	async findById(id: string): Promise<Nullable<ExampleEntity>> {
		const options = { where: { id } } as FindOneOptions<ExampleEntity>;

		return this.findOneEntity(options);
	}

	async findByCriteria(query: ExampleCriteriaQuery): Promise<CriteriaResult<ExampleEntity>> {
		const { where, take, skip, sortColumn, sortOrder } = query;

		const builder = this.createTypeOrmQueryBuilder();

		builder.where(where);
		builder.addOrderByColumn(sortColumn, sortOrder);
		builder.pagination(take, skip);

		return builder.executeGetManyAndCount();
	}

	async delete(id: string): Promise<boolean> {
		const { affected } = await this.deleteEntity(id);

		return affected !== 0;
	}

	async softDelete(id: string): Promise<boolean> {
		const { affected } = await this.softDeleteEntity(id);

		return affected !== 0;
	}

	protected entitySchema(): GenericEntityClassOrSchema<ExampleEntity> {
		return ExampleEntity;
	}
}
