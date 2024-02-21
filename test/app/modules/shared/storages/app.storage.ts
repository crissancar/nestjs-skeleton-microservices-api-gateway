import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

export class AppStorage {
	private static _app: INestApplication;

	static storeApp(moduleFixture: TestingModule): void {
		this.app = moduleFixture.createNestApplication();
	}

	static get app(): INestApplication {
		return this._app;
	}

	private static set app(value: INestApplication) {
		this._app = value;
	}
}
