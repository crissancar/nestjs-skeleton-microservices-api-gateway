import { INestApplication } from '@nestjs/common';

import { faqsConfig } from '../../../../../src/app/modules/faqs/config/faqs.config';
import { FAQCriteriaQuery } from '../../../../../src/app/modules/faqs/persistence/faq-criteria.query';
import { FAQRepository } from '../../../../../src/app/modules/faqs/repositories/faq.repository';
import { TypeOrmEnvironmentArranger } from '../../../../config/typeorm/typeorm-environment-arranger';
import { AppStorage } from '../../shared/storages/app.storage';
import { FindFAQsByCriteriaRequestMother } from '../dtos/find-faqs-by-criteria-request-mother.dto';

const { repositoryInterface } = faqsConfig.repository;

let app: INestApplication;
let repository: FAQRepository;

describe('FAQRepository', () => {
	it('#findByCriteria', async () => {
		const request = FindFAQsByCriteriaRequestMother.random();
		const faqCriteriaQuery = FAQCriteriaQuery.create(request);

		await repository.findByCriteria(faqCriteriaQuery);
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
