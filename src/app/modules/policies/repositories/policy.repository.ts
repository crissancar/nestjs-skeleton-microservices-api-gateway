import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { PolicyCriteriaQuery } from '../dto/policy-criteria-query.dto';
import { PolicyEntity } from '../persistence/policy.entity';

export interface PolicyRepository {
	findByCriteria(query: PolicyCriteriaQuery): Promise<CriteriaResult<PolicyEntity>>;
}
