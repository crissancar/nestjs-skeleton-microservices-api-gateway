import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { TypeOrmRepository } from '../../shared/persistence/typeorm.repository';
import { GenericEntityClassOrSchema } from '../../shared/types/generic-entity-class-or-schema.type';
import { FAQRepository } from '../repositories/faq.repository';
import { FAQEntity } from './faq.entity';
import { FAQCriteriaQuery } from './faq-criteria.query';

export class TypeOrmFAQRepository extends TypeOrmRepository<FAQEntity> implements FAQRepository {
	async findByCriteria(query: FAQCriteriaQuery): Promise<CriteriaResult<FAQEntity>> {
		const { where, take, skip, sortColumn, sortOrder } = query;

		const builder = this.createTypeOrmQueryBuilder();

		builder.where(where);
		builder.addOrderByColumn(sortColumn, sortOrder);
		builder.pagination(take, skip);

		return builder.executeGetManyAndCount();
	}

	protected entitySchema(): GenericEntityClassOrSchema<FAQEntity> {
		return FAQEntity;
	}
}
