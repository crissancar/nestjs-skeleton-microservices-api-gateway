import { EventEmitterModule } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';

import { usersConfig } from '../../../src/app/modules/users/config/users.config';
import { UserCreator } from '../../../src/app/modules/users/services/user-creator.service';
import { UserDeleter } from '../../../src/app/modules/users/services/user-deleter.service';
import { UserFinderByEmail } from '../../../src/app/modules/users/services/user-finder-by-email.service';
import { UserFinderById } from '../../../src/app/modules/users/services/user-finder-by-id.service';
import { UserFinderForAuthentication } from '../../../src/app/modules/users/services/user-finder-for-authentication.service';
import { UserFinderForStrategy } from '../../../src/app/modules/users/services/user-finder-for-strategy.service';
import { UserForgotPasswordUpdater } from '../../../src/app/modules/users/services/user-forgot-password-updater.service';
import { UserPasswordUpdater } from '../../../src/app/modules/users/services/user-password-updater.service';
import { UserSoftDeleter } from '../../../src/app/modules/users/services/user-soft-deleter.service';
import { UserUpdater } from '../../../src/app/modules/users/services/user-updater.service';
import { UsersFinderByCriteria } from '../../../src/app/modules/users/services/users-finder-by-criteria.service';
import { UserRepositoryMock } from '../../app/modules/users/__mocks__/user-repository.mock';

const { repositoryInterface } = usersConfig.repository;

export class UsersUnitTestingModule {
	static async create(): Promise<TestingModule> {
		const testingModule = await Test.createTestingModule({
			imports: [EventEmitterModule.forRoot()],
			providers: [
				UserCreator,
				UserDeleter,
				UserFinderByEmail,
				UserFinderById,
				UserFinderForAuthentication,
				UserFinderForStrategy,
				UserForgotPasswordUpdater,
				UserPasswordUpdater,
				UserSoftDeleter,
				UserUpdater,
				UsersFinderByCriteria,
				{ provide: repositoryInterface, useClass: UserRepositoryMock },
			],
		}).compile();

		testingModule.createNestApplication({ logger: false });

		return testingModule;
	}
}
