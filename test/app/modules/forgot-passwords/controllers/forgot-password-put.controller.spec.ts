import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { CreateForgotPasswordResponse } from '../../../../../src/app/modules/forgot-passwords/dtos/create-forgot-password-response.dto';
import { ForgotPasswordCreator } from '../../../../../src/app/modules/forgot-passwords/services/forgot-password-creator.service';
import { UserEntity } from '../../../../../src/app/modules/users/persistence/user.entity';
import { TypeOrmEnvironmentArranger } from '../../../../config/typeorm/typeorm-environment-arranger';
import { UserHelper } from '../../shared/helpers/user.helper';
import { ApiKeyStorage } from '../../shared/storages/api-key.storage';
import { AppStorage } from '../../shared/storages/app.storage';
import { CompleteForgotPasswordRequestMother } from '../dtos/complete-forgot-password-request-mother.dto';
import { CreateForgotPasswordRequestMother } from '../dtos/create-forgot-password-request-mother.dto';

let _request: request.Test;
let _response: request.Response;
let app: INestApplication;
let apiKey: string;
let user: UserEntity;
let forgotPassword: CreateForgotPasswordResponse;

describe('ForgotPasswordPutController', () => {
	it('should complete a forgot password', async () => {
		const url = `/forgot-passwords/${forgotPassword.id}`;

		const body = CompleteForgotPasswordRequestMother.random(forgotPassword.id);

		_request = request(app.getHttpServer())
			.put(url)
			.set('Authorization', `ApiKey ${apiKey}`)
			.send(body);

		_response = await _request.expect(200);
	});
});

beforeAll(async () => {
	await TypeOrmEnvironmentArranger.initApp();

	app = AppStorage.app;
	apiKey = ApiKeyStorage.apiKey;
	user = await UserHelper.createRandom();

	const forgotPasswordCreator = app.get(ForgotPasswordCreator);
	const request = CreateForgotPasswordRequestMother.random(user.email);
	forgotPassword = await forgotPasswordCreator.run(request);
});

afterAll(async () => {
	await TypeOrmEnvironmentArranger.closeApp();
});
