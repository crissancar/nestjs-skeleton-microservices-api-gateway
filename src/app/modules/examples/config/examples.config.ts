import { examplesSwaggerConfig } from './swagger/examples-swagger.config';

export const examplesConfig = {
	entity: { name: 'example' },
	globalRoute: 'examples',
	swagger: examplesSwaggerConfig,
	repository: {
		repositoryInterface: 'ExampleRepository',
	},
	getController: {
		constants: {
			context: 'ExampleGetController',
			routes: { find: ':id' },
			params: { id: 'id' },
		},
		logs: {
			find: {
				requestLog: 'Request received to find an example',
			},
			findByCriteria: {
				requestLog: 'Request received to find examples by criteria',
			},
		},
	},
	postController: {
		constants: {
			context: 'ExamplePostController',
		},
		logs: {
			requestLog: 'Request received to create a new example',
		},
	},
	putController: {
		constants: {
			context: 'ExamplePutController',
			routes: { updateExample: ':id', updateExamplePassword: ':id/update-password' },
			param: 'id',
		},
		logs: {
			requestLog: 'Request received to update an example',
		},
	},
	deleteController: {
		constants: {
			context: 'ExampleDeleteController',
			routes: { delete: ':id', softDelete: '/soft-delete/:id' },
			params: { id: 'id' },
		},
		logs: {
			deleteExample: {
				requestLog: 'Request received to delete an example',
			},
			softDelete: {
				requestLog: 'Request received to soft delete an example',
			},
		},
	},
	creator: {
		constants: {
			context: 'ExampleCreator',
		},
	},
	updater: {
		constants: {
			context: 'ExampleUpdater',
		},
	},
	deleter: {
		constants: {
			context: 'ExampleDeleter',
		},
	},
	finderById: {
		constants: {
			context: 'ExampleFinderById',
		},
	},
	softDeleter: {
		constants: {
			context: 'ExampleSoftDeleter',
		},
	},
};
