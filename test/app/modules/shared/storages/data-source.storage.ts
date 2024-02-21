import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';

export class DataSourceStorage {
	private static _dataSource: DataSource;

	static storeDataSource(app: INestApplication): void {
		this.dataSource = app.get(DataSource);
	}

	static get dataSource(): DataSource {
		return this._dataSource;
	}

	private static set dataSource(value: DataSource) {
		this._dataSource = value;
	}
}
