import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { Nullable } from '../../shared/types/nullable.type';
import { UpdateExampleRequest } from '../dtos/update-example-request.dto';
import { ExampleEntity } from '../persistence/example.entity';
import { ExampleCriteriaQuery } from '../persistence/example-criteria.query';

export interface ExampleRepository {
	create(example: ExampleEntity): Promise<ExampleEntity>;
	delete(id: string): Promise<boolean>;
	findByCriteria(query: ExampleCriteriaQuery): Promise<CriteriaResult<ExampleEntity>>;
	findById(id: string): Promise<Nullable<ExampleEntity>>;
	softDelete(id: string): Promise<boolean>;
	update(id: string, request: UpdateExampleRequest): Promise<ExampleEntity>;
}
