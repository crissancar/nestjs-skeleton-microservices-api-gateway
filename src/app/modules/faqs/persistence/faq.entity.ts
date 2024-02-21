import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TimestampEntity } from '../../shared/persistence/timestamp.entity';
import { faqsConfig } from '../config/faqs.config';
import { FAQLanguages } from '../enums/faq-languages.enum';

const { entity } = faqsConfig;

@Entity(entity)
export class FAQEntity extends TimestampEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		type: 'enum',
		enum: FAQLanguages,
		default: FAQLanguages.ENGLISH,
	})
	language: FAQLanguages;

	@Column()
	title: string;

	@Column()
	text: string;

	constructor(id: string, language: FAQLanguages, title: string, text: string) {
		super();
		this.id = id;
		this.language = language;
		this.title = title;
		this.text = text;
	}

	static create(id: string, language: FAQLanguages, title: string, text: string): FAQEntity {
		return new FAQEntity(id, language, title, text);
	}
}
