import * as colorette from 'colorette';
import { pid } from 'process';
import * as process from 'process';

import { LoggerFactory } from '../../app/modules/shared/services/logger-factory.service';
import { config } from '../app';

const { api, project, sentry, env } = config;

const logger = LoggerFactory.create('');

export class WelcomeLogs {
	static apiUrl = api.url || `http://localhost:${api.port}`;
	static apiVersion = api.version;
	static projectName = project.appName;
	static pid = pid;
	static environment = config.environment;
	static PWD = config.PWD;
	static sentryEnabled = String(sentry.enabled);
	static showEnv = env.show;

	static run(): void {
		logger.log(`${this.projectName}'s magic happens at ${this.apiUrl}/${this.apiVersion}`);
		logger.log(`Sentry enabled: ${this.sentryEnabled}`);
		logger.log(`Environment: ${this.environment}`);
		logger.log(`PID: ${this.pid || 'not forked'}`);
		logger.log(`Root: ${this.PWD}`);
		if (this.showEnv) {
			const kubideEnv = Object.fromEntries(
				Object.entries(process.env).filter(([key]) => /^KUBIDE/.test(key)),
			);
			logger.debug({
				message: colorette.yellowBright('Kubide environment variables'),
				...kubideEnv,
			});
		}
	}
}
