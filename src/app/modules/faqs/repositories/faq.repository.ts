import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { FAQEntity } from '../persistence/faq.entity';
import { FAQCriteriaQuery } from '../persistence/faq-criteria.query';

export interface FAQRepository {
	findByCriteria(query: FAQCriteriaQuery): Promise<CriteriaResult<FAQEntity>>;
}
