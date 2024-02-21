import { sharedHeadersSwagger } from '../../../shared/config/swagger/shared-headers.swagger';
import { sharedResponsesSwagger } from '../../../shared/config/swagger/shared-responses.swagger';
import { FindPoliciesByCriteriaResponse } from '../../dto/find-policies-by-criteria-response.dto';
import { policyPropertiesSwagger } from './properties/policy-properties.swagger';

const { type, language } = policyPropertiesSwagger;
const { ok, badRequest } = sharedResponsesSwagger;
const { findByCriteria, global } = sharedHeadersSwagger;

export const policiesSwaggerConfig = {
	tag: 'Policies',
	findByCriteria: {
		operation: {
			summary: 'Find policies by criteria',
		},
		query: {
			type: {
				...type,
				description: 'Type of policy file',
			},
			language: {
				...language,
				description: 'Language of policy file',
			},
		},
		response: {
			ok: {
				...ok,
				type: FindPoliciesByCriteriaResponse,
				headers: {
					...global,
					...findByCriteria,
				},
			},
			badRequest,
		},
	},
};
