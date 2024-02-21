import { ThumbnailsInterface } from '../../../../../src/app/modules/images/interfaces/thumbnails.interface';
import { ImageEntity } from '../../../../../src/app/modules/images/persistence/image.entity';
import { ThumbnailEntity } from '../../../../../src/app/modules/images/persistence/thumbnail.entity';
import { NumberMother } from '../../shared/mothers/number.mother';
import { UuidMother } from '../../shared/mothers/uuid.mother';
import { WordMother } from '../../shared/mothers/word.mother';
import { DataSourceStorage } from '../../shared/storages/data-source.storage';

export class ImageHelper {
	static async createRandom(): Promise<ImageEntity> {
		const repository = DataSourceStorage.dataSource.getRepository(ImageEntity);

		const imageEntity = ImageEntity.create(
			UuidMother.random(),
			WordMother.random(),
			this.createThumbnail(),
			WordMother.random(),
			this.createThumbnails(),
		);

		return repository.save(imageEntity);
	}

	private static createThumbnail(): ThumbnailEntity {
		return ThumbnailEntity.create(
			WordMother.random(),
			WordMother.random(),
			WordMother.random(),
			WordMother.random(),
			WordMother.random(),
			NumberMother.random(0, 10),
			NumberMother.random(0, 10),
			NumberMother.random(0, 10),
			WordMother.random(),
		);
	}

	private static createThumbnails(): ThumbnailsInterface {
		return { original: { ...this.createThumbnail() }, webp: { ...this.createThumbnail() } };
	}
}
