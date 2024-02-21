import { Test } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { AppModule } from '../../../src/app/app.module';
import { LoggerFactory } from '../../../src/app/modules/shared/services/logger-factory.service';
import { typeOrmConfig } from '../../../src/config/orm/typeorm.config';
import { ApiKeyStorage } from '../../app/modules/shared/storages/api-key.storage';
import { AppStorage } from '../../app/modules/shared/storages/app.storage';
import { DataSourceStorage } from '../../app/modules/shared/storages/data-source.storage';

export class TypeOrmEnvironmentArranger {
	static async initApp(): Promise<void> {
		const moduleFixture = await Test.createTestingModule({
			imports: [TypeOrmModule.forRoot(typeOrmConfig), AppModule],
		}).compile();

		AppStorage.storeApp(moduleFixture);
		const app = AppStorage.app;

		DataSourceStorage.storeDataSource(app);
		const dataSource = DataSourceStorage.dataSource;

		await ApiKeyStorage.storeApiKey(dataSource);

		await app.init();
	}

	static async closeApp(): Promise<void> {
		await AppStorage.app.close();
	}

	static async cleanDatabase(): Promise<void> {
		const teardownTypeOrmConfig: TypeOrmModuleOptions = {
			database: process.env.KUBIDE_postgres_database_name,
			host: process.env.KUBIDE_postgres_database_host,
			port: Number(process.env.KUBIDE_postgres_database_port),
			username: process.env.KUBIDE_postgres_database_username,
			password: process.env.KUBIDE_postgres_database_password,
			autoLoadEntities: true,
			extra: { charset: 'utf8mb4_unicode_ci' },
			logging: false,
			synchronize: false,
			type: 'postgres',
		};

		const moduleFixture = await Test.createTestingModule({
			imports: [TypeOrmModule.forRoot(teardownTypeOrmConfig)],
		}).compile();

		const dataSource = moduleFixture.get(DataSource);

		const { entityMetadatas } = dataSource;

		const queryRunner = dataSource.createQueryRunner();

		await Promise.all(
			entityMetadatas.map(async (entityMetadata) => {
				await queryRunner.query(`TRUNCATE "${entityMetadata.tableName}" CASCADE`);
			}),
		);

		await queryRunner.release();

		await dataSource.destroy();

		// eslint-disable-next-line no-console
		console.log('Database cleaned.');
	}
}
