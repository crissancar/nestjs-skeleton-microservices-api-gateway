import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { UserEntity } from '../../../../../src/app/modules/users/persistence/user.entity';
import { TypeOrmEnvironmentArranger } from '../../../../config/typeorm/typeorm-environment-arranger';
import { AccessTokenHelper } from '../../shared/helpers/access-token.helper';
import { UserHelper } from '../../shared/helpers/user.helper';
import { AppStorage } from '../../shared/storages/app.storage';

let _request: request.Test;
let _response: request.Response;
let app: INestApplication;
let deleteUser: UserEntity;
let deleteAccessToken: string;
let softDeleteUser: UserEntity;
let softDeleteAccessToken: string;

describe('UserDeleteController', () => {
	it('should delete a valid user', async () => {
		const url = `/users/${deleteUser.id}`;

		_request = request(app.getHttpServer())
			.delete(url)
			.set('Authorization', `Bearer ${deleteAccessToken}`);

		_response = await _request.expect(200);
	});

	it('should soft delete a valid user', async () => {
		const url = `/users/soft-delete/${softDeleteUser.id}`;

		_request = request(app.getHttpServer())
			.delete(url)
			.set('Authorization', `Bearer ${softDeleteAccessToken}`);

		_response = await _request.expect(200);
	});
});

beforeAll(async () => {
	await TypeOrmEnvironmentArranger.initApp();

	app = AppStorage.app;
	softDeleteUser = await UserHelper.createRandom();
	softDeleteAccessToken = AccessTokenHelper.create(softDeleteUser);
	deleteUser = await UserHelper.createRandom();
	deleteAccessToken = AccessTokenHelper.create(deleteUser);
});

afterAll(async () => {
	await TypeOrmEnvironmentArranger.closeApp();
});
