import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { Nullable } from '../../shared/types/nullable.type';
import { FileEntity } from '../persistence/file.entity';
import { FileCriteriaQuery } from '../persistence/file-criteria.query';

export interface FileRepository {
	create(file: FileEntity): Promise<FileEntity>;
	delete(id: string): Promise<boolean>;
	findById(id: string): Promise<Nullable<FileEntity>>;
	findByCriteria(query: FileCriteriaQuery): Promise<CriteriaResult<FileEntity>>;
}
