import { PolicyLanguages } from '../../../../../src/app/modules/policies/enums/policy-languages.enum';
import { PolicyTypes } from '../../../../../src/app/modules/policies/enums/policy-types.enum';
import { PolicyEntity } from '../../../../../src/app/modules/policies/persistence/policy.entity';
import { DateMother } from '../../shared/mothers/date.mother';
import { PhraseMother } from '../../shared/mothers/phrase.mother';
import { URLMother } from '../../shared/mothers/url.mother';
import { UuidMother } from '../../shared/mothers/uuid.mother';
import { WordMother } from '../../shared/mothers/word.mother';
import { DataSourceStorage } from '../../shared/storages/data-source.storage';

export class PolicyHelper {
	static async createRandom(): Promise<PolicyEntity> {
		const repository = DataSourceStorage.dataSource.getRepository(PolicyEntity);

		const policyEntity = PolicyEntity.create(
			UuidMother.random(),
			WordMother.random(),
			PhraseMother.random(),
			URLMother.random(),
			PolicyTypes.TERMS_AND_CONDITIONS,
			PolicyLanguages.ENGLISH,
			DateMother.soon(),
		);

		return repository.save(policyEntity);
	}
}
