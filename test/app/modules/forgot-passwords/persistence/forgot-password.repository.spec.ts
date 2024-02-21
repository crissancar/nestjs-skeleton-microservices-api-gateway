import { INestApplication } from '@nestjs/common';

import { forgotPasswordsConfig } from '../../../../../src/app/modules/forgot-passwords/config/forgot-passwords.config';
import { ForgotPasswordRepository } from '../../../../../src/app/modules/forgot-passwords/repositories/forgot-password.repository';
import { TypeOrmEnvironmentArranger } from '../../../../config/typeorm/typeorm-environment-arranger';
import { UserHelper } from '../../shared/helpers/user.helper';
import { AppStorage } from '../../shared/storages/app.storage';
import { CreateForgotPasswordRequestMother } from '../dtos/create-forgot-password-request-mother.dto';
import { ForgotPasswordHelper } from '../helpers/forgot-password.helper';
import { ForgotPasswordEntityMother } from './forgot-password-entity.mother';

const { repositoryInterface } = forgotPasswordsConfig.repository;

let app: INestApplication;
let repository: ForgotPasswordRepository;

describe('ForgotPasswordRepository', () => {
	it('#create', async () => {
		const user = await UserHelper.createRandom();
		const forgotPassword = ForgotPasswordEntityMother.random(user);

		await repository.create(forgotPassword);
	});

	it('#find', async () => {
		const user = await UserHelper.createRandom();
		const request = CreateForgotPasswordRequestMother.random(user.email);
		const forgotPassword = await ForgotPasswordHelper.create(request);

		await repository.find(forgotPassword.id);
	});

	it('#delete', async () => {
		const user = await UserHelper.createRandom();
		const request = CreateForgotPasswordRequestMother.random(user.email);
		const forgotPassword = await ForgotPasswordHelper.create(request);

		await repository.delete(forgotPassword.id);
	});
});

beforeAll(async () => {
	await TypeOrmEnvironmentArranger.initApp();

	app = AppStorage.app;
	repository = app.get(repositoryInterface);
});

afterAll(async () => {
	await TypeOrmEnvironmentArranger.closeApp();
});
