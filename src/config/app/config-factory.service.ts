/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as process from 'process';

import { deepFreeze } from '../utils/deep-freeze.utility';

export interface ConfigBaseOptions {
	[k: string]: unknown;
	envKey?: string;
	environment?: string;
	isProduction?: boolean;
	PWD?: string;
}

export class ConfigFactory<Config> {
	protected config: Config & ConfigBaseOptions;
	protected frozenConfig: Config & ConfigBaseOptions;

	constructor(configs: Config & ConfigBaseOptions) {
		this.config = configs;
		this.set();
	}

	set(): void {
		this.checkEnv();
		this.deepFreeze();
	}

	get(): Config & ConfigBaseOptions {
		return this.frozenConfig;
	}

	protected checkEnv(): void {
		if (process.env.PWD) {
			this.config.PWD = process.env.PWD;
		}
		if (process.env.ENV_KEY) {
			this.config.envKey = process.env.ENV_KEY;
		}

		if (process.env.NODE_ENV) {
			this.config.environment = process.env.NODE_ENV;
			this.config.isProduction = process.env.NODE_ENV === 'production';
		}

		const regex = new RegExp(`${this.config.envKey}_`, 'i');

		Object.getOwnPropertyNames(process.env).forEach((propName) => {
			if (!regex.test(propName)) {
				return;
			}

			const key = propName.replace(regex, '');
			const value = this.sanitizeValue(process.env[propName]);
			this.setConfigValue(this.config, key, value);
		});
	}

	protected deepFreeze(): void {
		this.frozenConfig = { ...this.config };
		deepFreeze(this.frozenConfig);
	}

	protected sanitizeValue(value: any): any {
		let newValue = value;

		if (!Number.isNaN(+newValue)) {
			newValue = Number(value);
		}

		if (value === 'null') {
			newValue = null;
		}

		if (value === 'true') {
			newValue = true;
		}

		if (value === 'false') {
			newValue = false;
		}

		if (typeof value === 'string') {
			try {
				newValue = JSON.parse(value);
			} catch (e) {
				newValue = value;
			}
		}

		return newValue;
	}

	protected setConfigValue(obj: any, key: string | string[], value: any): void {
		if (typeof key === 'string') {
			this.setConfigValue(obj, key.split('_'), value);

			return;
		}

		if (key.length === 1) {
			obj[key[0]] = value;
		} else {
			if (!obj[key[0]]) {
				obj[key[0]] = {};
			}

			this.setConfigValue(obj[key[0]], key.slice(1), value);
		}
	}
}
