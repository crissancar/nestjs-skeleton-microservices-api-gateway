import { policiesSwaggerConfig } from './swagger/policies-swagger.config';

export const policiesConfig = {
	entity: { name: 'policy' },
	globalRoute: 'policies',
	swagger: policiesSwaggerConfig,
	repository: {
		repositoryInterface: 'PolicyRepository',
	},
	getController: {
		constants: {
			context: 'PolicyGetController',
		},
		logs: {
			findByCriteria: {
				requestLog: 'Request received to find policies by criteria filter',
			},
		},
	},
};
