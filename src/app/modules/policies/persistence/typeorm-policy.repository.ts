import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { TypeOrmRepository } from '../../shared/persistence/typeorm.repository';
import { GenericEntityClassOrSchema } from '../../shared/types/generic-entity-class-or-schema.type';
import { PolicyCriteriaQuery } from '../dto/policy-criteria-query.dto';
import { PolicyRepository } from '../repositories/policy.repository';
import { PolicyEntity } from './policy.entity';

export class TypeOrmPolicyRepository
	extends TypeOrmRepository<PolicyEntity>
	implements PolicyRepository
{
	async findByCriteria(query: PolicyCriteriaQuery): Promise<CriteriaResult<PolicyEntity>> {
		const { where, take, skip, sortOrder } = query;

		const builder = this.createTypeOrmQueryBuilder();

		builder.where(where);
		builder.addOrderByDateApproximation('effectiveAt', sortOrder);
		builder.pagination(take, skip);

		return builder.executeGetManyAndCount();
	}

	protected entitySchema(): GenericEntityClassOrSchema<PolicyEntity> {
		return PolicyEntity;
	}
}
