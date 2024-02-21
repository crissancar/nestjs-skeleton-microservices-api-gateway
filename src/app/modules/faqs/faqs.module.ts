import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { faqsConfig } from './config/faqs.config';
import { FAQGetController } from './controllers/faq-get.controller';
import { FAQEntity } from './persistence/faq.entity';
import { TypeOrmFAQRepository } from './persistence/typeorm-faq.repository';
import { FAQsFinderByCriteria } from './services/faqs-finder-by-criteria.service';

const { repositoryInterface } = faqsConfig.repository;

@Module({
	controllers: [FAQGetController],
	imports: [TypeOrmModule.forFeature([FAQEntity])],
	providers: [
		FAQsFinderByCriteria,
		{ provide: repositoryInterface, useClass: TypeOrmFAQRepository },
	],
})
export class FAQsModule {}
