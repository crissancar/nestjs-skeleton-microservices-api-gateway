import { Injectable } from '@nestjs/common';

import { AxiosFetcher } from '../../axios/services/axios-fetcher.service';
import { ExternalApiHTTPConfig } from '../../axios/services/external-api-http-config.service';
import { FetchExamplesException } from '../exceptions/fetch-examples.exception';

const context = 'AxiosExampleFetcher';

interface RandomExampleResponse {
	results: Array<object>;
	info: {
		seed: string;
		results: number;
		page: number;
		version: string;
	};
}

export interface ExampleFetcherResponse {
	seed: string;
	results: number;
	page: number;
	version: string;
}

@Injectable()
export class AxiosExampleFetcher extends AxiosFetcher {
	async randomExample(): Promise<ExampleFetcherResponse> {
		const config = ExternalApiHTTPConfig.create();

		const url = '/api';

		try {
			const { info } = await this.get<RandomExampleResponse>(url, config);

			return info;
		} catch (error) {
			throw new FetchExamplesException(context);
		}
	}
}
