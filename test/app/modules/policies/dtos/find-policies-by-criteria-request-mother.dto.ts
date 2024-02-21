import { FindPoliciesByCriteriaRequest } from '../../../../../src/app/modules/policies/dto/find-policies-by-criteria.request.dto';
import { PolicyLanguages } from '../../../../../src/app/modules/policies/enums/policy-languages.enum';
import { PolicyTypes } from '../../../../../src/app/modules/policies/enums/policy-types.enum';
import { PolicyEntity } from '../../../../../src/app/modules/policies/persistence/policy.entity';
import { SortColumn } from '../../../../../src/app/modules/shared/types/sort-column.type';
import { SortOrder } from '../../../../../src/app/modules/shared/types/sort-order.type';

export class FindPoliciesByCriteriaRequestMother {
	static create(
		type?: PolicyTypes,
		language?: PolicyLanguages,
		sortColumn?: SortColumn<PolicyEntity>,
		sortOrder?: SortOrder,
		take?: number,
		page?: number,
	): FindPoliciesByCriteriaRequest {
		return { type, language, sortColumn, sortOrder, take, page };
	}

	static fromExpectedPolicies(
		expectedPolicies: Array<PolicyEntity>,
	): FindPoliciesByCriteriaRequest {
		const { type, language } = expectedPolicies[0];

		return this.create(type, language);
	}

	static random(): FindPoliciesByCriteriaRequest {
		const type = PolicyTypes.TERMS_AND_CONDITIONS;
		const language = PolicyLanguages.ENGLISH;

		return this.create(type, language);
	}
}
