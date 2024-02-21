import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { CreateUserResponse } from '../../../../../src/app/modules/users/dtos/create-user-response.dto';
import { TypeOrmEnvironmentArranger } from '../../../../config/typeorm/typeorm-environment-arranger';
import { UserHelper } from '../../shared/helpers/user.helper';
import { ApiKeyStorage } from '../../shared/storages/api-key.storage';
import { AppStorage } from '../../shared/storages/app.storage';
import { CreateForgotPasswordRequestMother } from '../dtos/create-forgot-password-request-mother.dto';

let _request: request.Test;
let _response: request.Response;
let app: INestApplication;
let apiKey: string;
let user: CreateUserResponse;

describe('ForgotPasswordPostController', () => {
	it('should create a forgot password', async () => {
		const url = '/forgot-passwords';

		const body = CreateForgotPasswordRequestMother.random(user.email);

		_request = request(app.getHttpServer())
			.post(url)
			.set('Authorization', `ApiKey ${apiKey}`)
			.send(body);

		_response = await _request.expect(201);
	});
});

beforeAll(async () => {
	await TypeOrmEnvironmentArranger.initApp();

	app = AppStorage.app;
	apiKey = ApiKeyStorage.apiKey;
	user = await UserHelper.createRandom();
});

afterAll(async () => {
	await TypeOrmEnvironmentArranger.closeApp();
});
