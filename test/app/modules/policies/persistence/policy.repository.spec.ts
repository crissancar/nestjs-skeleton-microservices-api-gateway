import { INestApplication } from '@nestjs/common';

import { forgotPasswordsConfig } from '../../../../../src/app/modules/forgot-passwords/config/forgot-passwords.config';
import { PolicyCriteriaQuery } from '../../../../../src/app/modules/policies/dto/policy-criteria-query.dto';
import { PolicyRepository } from '../../../../../src/app/modules/policies/repositories/policy.repository';
import { TypeOrmEnvironmentArranger } from '../../../../config/typeorm/typeorm-environment-arranger';
import { AppStorage } from '../../shared/storages/app.storage';
import { FindPoliciesByCriteriaRequestMother } from '../dtos/find-policies-by-criteria-request-mother.dto';
import { policiesConfig } from '../../../../../src/app/modules/policies/config/policies.config';

const { repositoryInterface } = policiesConfig.repository;

let app: INestApplication;
let repository: PolicyRepository;

describe('PolicyRepository', () => {
	it('#findByCriteria', async () => {
		const request = FindPoliciesByCriteriaRequestMother.random();
		const policyCriteriaQuery = PolicyCriteriaQuery.create(request);

		await repository.findByCriteria(policyCriteriaQuery);
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
