export interface RedocOptions {
	sortPropsAlphabetically: boolean;
	hideDownloadButton: boolean;
	hideHostname: boolean;
	noAutoAuth: boolean;
	disableSearch: boolean;
	tagGroups: Array<{ name: string; tags: Array<string> }>;
}
