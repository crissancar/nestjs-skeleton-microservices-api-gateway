import { INestApplication } from '@nestjs/common';
import path from 'path';
import request from 'supertest';

import { UserEntity } from '../../../../../src/app/modules/users/persistence/user.entity';
import { TypeOrmEnvironmentArranger } from '../../../../config/typeorm/typeorm-environment-arranger';
import { AccessTokenHelper } from '../../shared/helpers/access-token.helper';
import { UserHelper } from '../../shared/helpers/user.helper';
import { AppStorage } from '../../shared/storages/app.storage';
import { CreateImageRequestMother } from '../dtos/create-image-request-mother.dto';

let _request: request.Test;
let _response: request.Response;
let app: INestApplication;
let user: UserEntity;
let accessToken: string;

describe('ImagePostController', () => {
	it('should create and upload to CDN a valid image', async () => {
		const url = '/images';

		const imagePath = path.resolve('test/assets/kubide.png');

		const body = CreateImageRequestMother.random(user);

		_request = request(app.getHttpServer())
			.post(url)
			.attach('image', imagePath)
			.field('name', body.name)
			.field('profile', body.profile)
			.set('Authorization', `Bearer ${accessToken}`);

		_response = await _request.expect(201);
	});
});

beforeAll(async () => {
	await TypeOrmEnvironmentArranger.initApp();

	app = AppStorage.app;
	user = await UserHelper.createRandom();
	accessToken = AccessTokenHelper.create(user);
});

afterAll(async () => {
	await TypeOrmEnvironmentArranger.closeApp();
});
