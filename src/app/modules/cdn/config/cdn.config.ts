export const cdnConfig = {
	persister: {
		constants: {
			context: 'CDNPersister',
		},
		logs: {
			requestLog: 'Running CDNPersister',
			responseLog: (name: string): string => `File with name <${name}> persisted in CDN`,
		},
	},
};
