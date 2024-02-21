import { PolicyLanguages } from '../../../../../src/app/modules/policies/enums/policy-languages.enum';
import { PolicyTypes } from '../../../../../src/app/modules/policies/enums/policy-types.enum';
import { PolicyEntity } from '../../../../../src/app/modules/policies/persistence/policy.entity';
import { DateMother } from '../../shared/mothers/date.mother';
import { PhraseMother } from '../../shared/mothers/phrase.mother';
import { URLMother } from '../../shared/mothers/url.mother';
import { UuidMother } from '../../shared/mothers/uuid.mother';
import { WordMother } from '../../shared/mothers/word.mother';

export class PolicyEntityMother {
	static create(
		id: string,
		title: string,
		description: string,
		url: string,
		type: PolicyTypes,
		language: PolicyLanguages,
		effectiveAt: Date,
	): PolicyEntity {
		return PolicyEntity.create(id, title, description, url, type, language, effectiveAt);
	}

	static random(): PolicyEntity {
		const id = UuidMother.random();
		const title = WordMother.random();
		const description = PhraseMother.random();
		const url = URLMother.random();
		const type = PolicyTypes.TERMS_AND_CONDITIONS;
		const language = PolicyLanguages.ENGLISH;
		const effectiveAt = DateMother.soon();

		return this.create(id, title, description, url, type, language, effectiveAt);
	}
}
