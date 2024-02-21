import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { CreateUserRequest } from '../../../../../src/app/modules/users/dtos/create-user-request.dto';
import { UserEntity } from '../../../../../src/app/modules/users/persistence/user.entity';
import { TypeOrmEnvironmentArranger } from '../../../../config/typeorm/typeorm-environment-arranger';
import { AccessTokenHelper } from '../../shared/helpers/access-token.helper';
import { UserHelper } from '../../shared/helpers/user.helper';
import { AppStorage } from '../../shared/storages/app.storage';
import { CreateUserRequestMother } from '../dtos/create-user-request-mother.dto';
import { UpdateUserPasswordRequestMother } from '../dtos/update-user-password-request-mother.dto';
import { UpdateUserRequestMother } from '../dtos/update-user-request-mother.dto';

let _request: request.Test;
let _response: request.Response;
let app: INestApplication;
let user: UserEntity;
let createUserRequest: CreateUserRequest;
let accessToken: string;

describe('UserPutController', () => {
	it('should update a valid user', async () => {
		const url = `/users/${user.id}`;

		const body = UpdateUserRequestMother.random(user.id);

		_request = request(app.getHttpServer())
			.put(url)
			.set('Authorization', `Bearer ${accessToken}`)
			.send(body);

		_response = await _request.expect(201);
	});

	it('should update a valid user password', async () => {
		const url = `/users/${user.id}/update-password`;

		const { password: oldPassword } = createUserRequest;
		const body = UpdateUserPasswordRequestMother.random(user, oldPassword);

		_request = request(app.getHttpServer())
			.put(url)
			.set('Authorization', `Bearer ${accessToken}`)
			.send(body);

		_response = await _request.expect(201);
	});
});

beforeAll(async () => {
	await TypeOrmEnvironmentArranger.initApp();

	app = AppStorage.app;
	createUserRequest = CreateUserRequestMother.random();
	user = await UserHelper.create(createUserRequest);
	accessToken = AccessTokenHelper.create(user);
});

afterAll(async () => {
	await TypeOrmEnvironmentArranger.closeApp();
});
