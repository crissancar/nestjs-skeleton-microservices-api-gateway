import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { ImageEntity } from '../../../../../src/app/modules/images/persistence/image.entity';
import { UserEntity } from '../../../../../src/app/modules/users/persistence/user.entity';
import { TypeOrmEnvironmentArranger } from '../../../../config/typeorm/typeorm-environment-arranger';
import { AccessTokenHelper } from '../../shared/helpers/access-token.helper';
import { UserHelper } from '../../shared/helpers/user.helper';
import { AppStorage } from '../../shared/storages/app.storage';
import { ImageHelper } from '../helpers/image.helper';

let _request: request.Test;
let _response: request.Response;
let app: INestApplication;
let user: UserEntity;
let accessToken: string;
let image: ImageEntity;

describe('ImageGetController', () => {
	it('should find a valid image by id', async () => {
		const url = `/images/${image.id}`;

		_request = request(app.getHttpServer()).get(url).set('Authorization', `Bearer ${accessToken}`);

		_response = await _request.expect(200);
	});

	it('should find a valid images by criteria', async () => {
		const url = `/images/?name=${image.name}&take=0&page=1`;

		_request = request(app.getHttpServer()).get(url).set('Authorization', `Bearer ${accessToken}`);

		_response = await _request.expect(200);
	});
});

beforeAll(async () => {
	await TypeOrmEnvironmentArranger.initApp();

	app = AppStorage.app;
	user = await UserHelper.createRandom();
	accessToken = AccessTokenHelper.create(user);
	image = await ImageHelper.createRandom();
});

afterAll(async () => {
	await TypeOrmEnvironmentArranger.closeApp();
});
