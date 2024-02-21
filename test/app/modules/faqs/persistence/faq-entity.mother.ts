import { FAQLanguages } from '../../../../../src/app/modules/faqs/enums/faq-languages.enum';
import { FAQEntity } from '../../../../../src/app/modules/faqs/persistence/faq.entity';
import { PhraseMother } from '../../shared/mothers/phrase.mother';
import { UuidMother } from '../../shared/mothers/uuid.mother';
import { WordMother } from '../../shared/mothers/word.mother';

export class FAQEntityMother {
	static create(id: string, language: FAQLanguages, title: string, text: string): FAQEntity {
		return FAQEntity.create(id, language, title, text);
	}

	static random(): FAQEntity {
		const id = UuidMother.random();
		const language = FAQLanguages.ENGLISH;
		const title = WordMother.random();
		const text = PhraseMother.random();

		return this.create(id, language, title, text);
	}
}
