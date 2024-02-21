import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { PolicyEntity } from '../../../../../src/app/modules/policies/persistence/policy.entity';
import { TypeOrmEnvironmentArranger } from '../../../../config/typeorm/typeorm-environment-arranger';
import { ApiKeyStorage } from '../../shared/storages/api-key.storage';
import { AppStorage } from '../../shared/storages/app.storage';
import { PolicyHelper } from '../helpers/policy.helper';

let _request: request.Test;
let _response: request.Response;
let app: INestApplication;
let apiKey: string;
let policy: PolicyEntity;

describe('PolicyGetController', () => {
	it('should find a valid policies by criteria', async () => {
		const url = `/policies/?type=${policy.type}&take=0&page=1`;

		_request = request(app.getHttpServer()).get(url).set('Authorization', `ApiKey ${apiKey}`);

		_response = await _request.expect(200);
	});
});

beforeAll(async () => {
	await TypeOrmEnvironmentArranger.initApp();

	app = AppStorage.app;
	apiKey = ApiKeyStorage.apiKey;
	policy = await PolicyHelper.createRandom();
});

afterAll(async () => {
	await TypeOrmEnvironmentArranger.closeApp();
});
