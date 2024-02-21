import { AxiosRequestConfig } from 'axios';

import { config } from '../../../../config/app';

const { baseURL, apiKey } = config.axios.externalApi;

export class ExternalApiHTTPConfig {
	static create(): AxiosRequestConfig {
		return {
			baseURL,
			headers: { Authorization: `ApiKey ${apiKey}` },
		};
	}
}
