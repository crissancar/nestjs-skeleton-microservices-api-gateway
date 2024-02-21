import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { CreateUserRequest } from '../../../../../src/app/modules/users/dtos/create-user-request.dto';
import { UserEntity } from '../../../../../src/app/modules/users/persistence/user.entity';
import { TypeOrmEnvironmentArranger } from '../../../../config/typeorm/typeorm-environment-arranger';
import { UserHelper } from '../../shared/helpers/user.helper';
import { ApiKeyStorage } from '../../shared/storages/api-key.storage';
import { AppStorage } from '../../shared/storages/app.storage';
import { CreateUserRequestMother } from '../../users/dtos/create-user-request-mother.dto';

let _request: request.Test;
let _response: request.Response;
let app: INestApplication;
let apiKey: string;
let refreshToken: string;
let user: UserEntity;
let createUserRequest: CreateUserRequest;

describe('AuthPostController', () => {
	it('should authenticate a valid user', async () => {
		const url = '/auth/login';

		const { email } = user;
		const { password } = createUserRequest;
		const body = { email, password };

		_request = request(app.getHttpServer())
			.post(url)
			.set('Authorization', `ApiKey ${apiKey}`)
			.send(body);

		_response = await _request.expect(201);

		refreshToken = _response.body.data.refreshToken;
	});

	it('should refresh a valid token', async () => {
		const url = '/auth/refresh-token';

		_request = request(app.getHttpServer())
			.post(url)
			.set('Authorization', `Bearer ${refreshToken}`);

		_response = await _request.expect(201);
	});
});

beforeAll(async () => {
	await TypeOrmEnvironmentArranger.initApp();

	app = AppStorage.app;
	apiKey = ApiKeyStorage.apiKey;
	createUserRequest = CreateUserRequestMother.random();
	user = await UserHelper.create(createUserRequest);
});

afterAll(async () => {
	await TypeOrmEnvironmentArranger.closeApp();
});
