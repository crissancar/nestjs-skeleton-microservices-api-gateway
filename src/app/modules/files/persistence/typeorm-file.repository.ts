import { FindOneOptions } from 'typeorm';

import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { TypeOrmRepository } from '../../shared/persistence/typeorm.repository';
import { GenericEntityClassOrSchema } from '../../shared/types/generic-entity-class-or-schema.type';
import { Nullable } from '../../shared/types/nullable.type';
import { FileRepository } from '../repositories/file.repository';
import { FileEntity } from './file.entity';
import { FileCriteriaQuery } from './file-criteria.query';

export class TypeOrmFileRepository extends TypeOrmRepository<FileEntity> implements FileRepository {
	async create(fileEntity: FileEntity): Promise<FileEntity> {
		return this.persistEntity(fileEntity);
	}

	async delete(id: string): Promise<boolean> {
		const { affected } = await this.deleteEntity(id);

		return affected !== 0;
	}

	async findById(id: string): Promise<Nullable<FileEntity>> {
		const options = { where: { id } } as FindOneOptions<FileEntity>;

		return this.findOneEntity(options);
	}

	async findByCriteria(query: FileCriteriaQuery): Promise<CriteriaResult<FileEntity>> {
		const { where, take, skip, sortMimetype, sortOrder, sortColumn } = query;

		const builder = this.createTypeOrmQueryBuilder();

		builder.where(where);
		builder.addOrderByColumnCase('mimetype', sortMimetype, sortOrder);
		builder.addOrderByColumn(sortColumn, sortOrder);
		builder.pagination(take, skip);

		return builder.executeGetManyAndCount();
	}

	protected entitySchema(): GenericEntityClassOrSchema<FileEntity> {
		return FileEntity;
	}
}
