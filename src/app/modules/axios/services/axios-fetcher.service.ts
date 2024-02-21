import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { Nullable } from '../../shared/types/nullable.type';
import { axiosConfig } from '../config/axios.config';

const { fetcher } = axiosConfig;
const { context } = fetcher.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class AxiosFetcher {
	private readonly axios: AxiosInstance;

	constructor(private readonly http: HttpService) {
		this.axios = http.axiosRef;
	}

	protected async get<T>(url: string, config: AxiosRequestConfig): Promise<T> {
		try {
			this.printRequestLog(url, config);

			const response = await this.axios.get<T>(url, config);

			this.printResponseLog(response);

			return response.data;
		} catch (error) {
			this.printErrorLog(error);
			throw error;
		}
	}

	protected async post<T>(
		url: string,
		config: AxiosRequestConfig,
		data?: Nullable<unknown>,
	): Promise<T> {
		try {
			this.printRequestLog(url, config, data);

			const response = await this.axios.post<T>(url, data, config);

			this.printResponseLog(response);

			return response.data;
		} catch (error) {
			this.printErrorLog(error);
			throw error;
		}
	}

	protected async put<T>(
		url: string,
		config: AxiosRequestConfig,
		data?: Nullable<unknown>,
	): Promise<T> {
		try {
			this.printRequestLog(url, config);

			const response = await this.axios.put<T>(url, data, config);

			this.printResponseLog(response);

			return response.data;
		} catch (error) {
			this.printErrorLog(error);
			throw error;
		}
	}

	protected async delete<T>(url: string, config: AxiosRequestConfig): Promise<T> {
		try {
			this.printRequestLog(url, config);

			const response = await this.axios.delete<T>(url, config);

			this.printResponseLog(response);

			return response.data;
		} catch (error) {
			this.printErrorLog(error);
			throw error;
		}
	}

	private printRequestLog(
		endpointURL: string,
		config: AxiosRequestConfig,
		body?: Nullable<unknown>,
	): void {
		const { baseURL } = config;

		const url = `${baseURL}${endpointURL}`;

		logger.debug({ data: { url, config, body } }, 'Axios request');
	}

	private printResponseLog(response: AxiosResponse): void {
		const { status: statusCode, statusText, data: body } = response;

		logger.debug(
			{
				data: {
					status: { code: statusCode, message: statusText },
					body,
					headers: response.headers,
				},
			},
			'Axios response',
		);
	}

	private printErrorLog(error: unknown): void {
		const axiosError = error as AxiosError;

		if (axiosError.response) {
			const { status: statusCode, statusText, data } = axiosError.response;
			const { message } = data as {
				message: string | Array<string>;
			};

			logger.error({ error: { statusCode, statusText, message } }, 'Axios error');
		} else {
			const { code, message } = axiosError;
			logger.error({ error: { code, message } }, 'Axios error');
		}
	}
}
