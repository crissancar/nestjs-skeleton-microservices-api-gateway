import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { FAQEntity } from '../../../../../src/app/modules/faqs/persistence/faq.entity';
import { UserEntity } from '../../../../../src/app/modules/users/persistence/user.entity';
import { TypeOrmEnvironmentArranger } from '../../../../config/typeorm/typeorm-environment-arranger';
import { UserHelper } from '../../shared/helpers/user.helper';
import { AppStorage } from '../../shared/storages/app.storage';
import { FAQHelper } from '../helpers/faq.helper';
import { AccessTokenHelper } from './../../shared/helpers/access-token.helper';

let _request: request.Test;
let _response: request.Response;
let app: INestApplication;
let user: UserEntity;
let accessToken: string;
let faq: FAQEntity;

describe('FAQGetController', () => {
	it('should find a valid faqs by criteria', async () => {
		const url = `/faqs/?language=${faq.language}&take=0&page=1`;

		_request = request(app.getHttpServer()).get(url).set('Authorization', `Bearer ${accessToken}`);

		_response = await _request.expect(200);
	});
});

beforeAll(async () => {
	await TypeOrmEnvironmentArranger.initApp();

	app = AppStorage.app;
	user = await UserHelper.createRandom();
	accessToken = AccessTokenHelper.create(user);
	faq = await FAQHelper.createRandom();
});

afterAll(async () => {
	await TypeOrmEnvironmentArranger.closeApp();
});
