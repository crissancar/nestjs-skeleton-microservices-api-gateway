import { FAQLanguages } from '../../../../../src/app/modules/faqs/enums/faq-languages.enum';
import { FAQEntity } from '../../../../../src/app/modules/faqs/persistence/faq.entity';
import { PhraseMother } from '../../shared/mothers/phrase.mother';
import { UuidMother } from '../../shared/mothers/uuid.mother';
import { WordMother } from '../../shared/mothers/word.mother';
import { DataSourceStorage } from '../../shared/storages/data-source.storage';

export class FAQHelper {
	static async createRandom(): Promise<FAQEntity> {
		const repository = DataSourceStorage.dataSource.getRepository(FAQEntity);

		const policyEntity = FAQEntity.create(
			UuidMother.random(),
			FAQLanguages.ENGLISH,
			WordMother.random(),
			PhraseMother.random(),
		);

		return repository.save(policyEntity);
	}
}
