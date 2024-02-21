import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { Nullable } from '../../shared/types/nullable.type';
import { ImageCriteriaQuery } from '../dtos/image-criteria-query.dto';
import { ImageEntity } from '../persistence/image.entity';

export interface ImageRepository {
	create(image: ImageEntity): Promise<ImageEntity>;
	delete(id: string): Promise<boolean>;
	findById(id: string): Promise<Nullable<ImageEntity>>;
	findByCriteria(query: ImageCriteriaQuery): Promise<CriteriaResult<ImageEntity>>;
}
