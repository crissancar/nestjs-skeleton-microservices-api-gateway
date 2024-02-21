import { INestApplication } from '@nestjs/common';
import path from 'path';
import request from 'supertest';

import { UserEntity } from '../../../../../src/app/modules/users/persistence/user.entity';
import { TypeOrmEnvironmentArranger } from '../../../../config/typeorm/typeorm-environment-arranger';
import { AccessTokenHelper } from '../../shared/helpers/access-token.helper';
import { UserHelper } from '../../shared/helpers/user.helper';
import { AppStorage } from '../../shared/storages/app.storage';
import { CreateFileRequestMother } from '../dtos/create-file-request-mother.dto';

let _request: request.Test;
let _response: request.Response;
let app: INestApplication;
let user: UserEntity;
let accessToken: string;

describe('FilePostController', () => {
	it('should create and upload to CDN a valid file', async () => {
		const url = '/files';

		const filePath = path.resolve('test/assets/Nest-cheatsheet.pdf');

		const body = CreateFileRequestMother.random(user);

		_request = request(app.getHttpServer())
			.post(url)
			.attach('file', filePath)
			.field('title', body.title)
			.field('description', body.description)
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
