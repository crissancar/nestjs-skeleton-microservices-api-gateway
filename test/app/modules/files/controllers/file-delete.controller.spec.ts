import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { FileEntity } from '../../../../../src/app/modules/files/persistence/file.entity';
import { UserEntity } from '../../../../../src/app/modules/users/persistence/user.entity';
import { TypeOrmEnvironmentArranger } from '../../../../config/typeorm/typeorm-environment-arranger';
import { AccessTokenHelper } from '../../shared/helpers/access-token.helper';
import { UserHelper } from '../../shared/helpers/user.helper';
import { AppStorage } from '../../shared/storages/app.storage';
import { FileHelper } from '../helpers/file.helper';

let _request: request.Test;
let _response: request.Response;
let app: INestApplication;
let user: UserEntity;
let accessToken: string;
let file: FileEntity;

describe('FileDeleteController', () => {
	it('should delete a valid file', async () => {
		const url = `/files/${file.id}`;

		_request = request(app.getHttpServer())
			.delete(url)
			.set('Authorization', `Bearer ${accessToken}`);

		_response = await _request.expect(200);
	});
});

beforeAll(async () => {
	await TypeOrmEnvironmentArranger.initApp();

	app = AppStorage.app;
	user = await UserHelper.createRandom();
	accessToken = AccessTokenHelper.create(user);
	file = await FileHelper.createRandom(user);
});

afterAll(async () => {
	await TypeOrmEnvironmentArranger.closeApp();
});
