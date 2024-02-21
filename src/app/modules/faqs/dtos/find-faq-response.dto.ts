import { FAQLanguages } from '../enums/faq-languages.enum';
import { FAQEntity } from '../persistence/faq.entity';

export class FindFAQResponse {
	readonly id: string;

	readonly language: FAQLanguages;

	readonly title: string;

	readonly text: string;

	constructor(id: string, language: FAQLanguages, title: string, text: string) {
		this.id = id;
		this.language = language;
		this.title = title;
		this.text = text;
	}

	static create(foundFAQ: FAQEntity): FindFAQResponse {
		const { id, language, title, text } = foundFAQ;

		return new FindFAQResponse(id, language, title, text);
	}
}
