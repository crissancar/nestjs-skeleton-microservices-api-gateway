import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AxiosModule } from '../axios/axios.module';
import { examplesConfig } from './config/examples.config';
import { ExampleDeleteController } from './controllers/example-delete.controller';
import { ExampleGetController } from './controllers/example-get.controller';
import { ExamplePostController } from './controllers/example-post.controller';
import { ExamplePutController } from './controllers/example-put.controller';
import { AxiosExampleFetcher } from './fetchers/axios-example.fetcher';
import { ExampleEntity } from './persistence/example.entity';
import { ExampleEntitySubscriber } from './persistence/example-entity.subscriber';
import { TypeOrmExampleRepository } from './persistence/typeorm-example.repository';
import { ExampleCreator } from './services/example-creator.service';
import { ExampleDeleter } from './services/example-deleter.service';
import { ExampleFinderById } from './services/example-finder-by-id.service';
import { ExampleSoftDeleter } from './services/example-soft-deleter.service';
import { ExampleUpdater } from './services/example-updater.service';
import { ExamplesFinderByCriteria } from './services/examples-finder-by-criteria.service';

const { repositoryInterface } = examplesConfig.repository;

@Module({
	imports: [TypeOrmModule.forFeature([ExampleEntity]), AxiosModule],
	controllers: [
		ExamplePostController,
		ExamplePutController,
		ExampleGetController,
		ExampleDeleteController,
	],
	providers: [
		ExampleCreator,
		ExampleDeleter,
		ExampleEntitySubscriber,
		AxiosExampleFetcher,
		ExamplesFinderByCriteria,
		ExampleFinderById,
		ExampleSoftDeleter,
		ExampleUpdater,
		{ provide: repositoryInterface, useClass: TypeOrmExampleRepository },
	],
	exports: [],
})
export class ExamplesModule {}
