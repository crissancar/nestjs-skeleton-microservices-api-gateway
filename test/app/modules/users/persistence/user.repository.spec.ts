import { INestApplication } from '@nestjs/common';

import { usersConfig } from '../../../../../src/app/modules/users/config/users.config';
import { UserCriteriaQuery } from '../../../../../src/app/modules/users/persistence/user-criteria.query';
import { UserRepository } from '../../../../../src/app/modules/users/repositories/user.repository';
import { TypeOrmEnvironmentArranger } from '../../../../config/typeorm/typeorm-environment-arranger';
import { UserHelper } from '../../shared/helpers/user.helper';
import { AppStorage } from '../../shared/storages/app.storage';
import { FindUsersByCriteriaRequestMother } from '../dtos/find-users-by-criteria-request-mother.dto';
import { UpdateUserPasswordRequestMother } from '../dtos/update-user-password-request-mother.dto';
import { UpdateUserRequestMother } from '../dtos/update-user-request-mother.dto';
import { UserEntityMother } from './user-entity.mother';

const { repositoryInterface } = usersConfig.repository;

let app: INestApplication;
let repository: UserRepository;

describe('UserRepository', () => {
	it('#create', async () => {
		const user = UserEntityMother.random();

		await repository.create(user);
	});

	it('#update', async () => {
		const user = await UserHelper.createRandom();
		const request = UpdateUserRequestMother.random(user.id);

		await repository.update(user.id, request);
	});

	it('#updatePassword', async () => {
		const user = await UserHelper.createRandom();
		const request = UpdateUserPasswordRequestMother.random(user, user.password);

		await repository.updatePassword(user, request);
	});

	it('#findById', async () => {
		const user = await UserHelper.createRandom();

		await repository.findById(user.id);
	});

	it('#findByEmail', async () => {
		const user = await UserHelper.createRandom();

		await repository.findByEmail(user.email);
	});

	it('#findByCriteria', async () => {
		const request = FindUsersByCriteriaRequestMother.random();
		const userCriteriaQuery = UserCriteriaQuery.create(request);

		await repository.findByCriteria(userCriteriaQuery);
	});

	it('#delete', async () => {
		const user = await UserHelper.createRandom();

		await repository.delete(user.id);
	});

	it('#softDelete', async () => {
		const user = await UserHelper.createRandom();

		await repository.softDelete(user.id);
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
