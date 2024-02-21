import { Injectable } from '@nestjs/common';

import { InvalidCredentialsException } from '../../../../../src/app/modules/auth/exceptions/invalid-credentials.exception';
import { CriteriaResult } from '../../../../../src/app/modules/shared/interfaces/criteria-result.interface';
import { Nullable } from '../../../../../src/app/modules/shared/types/nullable.type';
import { UpdateUserForgotPasswordRequest } from '../../../../../src/app/modules/users/dtos/update-user-forgot-password-request.dto';
import { UpdateUserPasswordRequest } from '../../../../../src/app/modules/users/dtos/update-user-password-request.dto';
import { UpdateUserRequest } from '../../../../../src/app/modules/users/dtos/update-user-request.dto';
import { UserWithEmailAlreadyExistsException } from '../../../../../src/app/modules/users/exceptions/user-with-email-already-exists.exception';
import { UserWithIdNotExistsException } from '../../../../../src/app/modules/users/exceptions/user-with-id-not-exists.exception';
import { UserEntity } from '../../../../../src/app/modules/users/persistence/user.entity';
import { UserCriteriaQuery } from '../../../../../src/app/modules/users/persistence/user-criteria.query';
import { UserRepository } from '../../../../../src/app/modules/users/repositories/user.repository';

const context = 'UserRepositoryMock';

@Injectable()
export class UserRepositoryMock implements UserRepository {
	private readonly mockSave = jest.fn();
	private readonly mockSearch = jest.fn();
	private readonly mockDelete = jest.fn();
	private readonly mockMatching = jest.fn();
	private users: Array<UserEntity> = [];

	async create(user: UserEntity): Promise<UserEntity> {
		this.mockSave(user);

		return Promise.resolve(user);
	}

	async delete(id: string): Promise<boolean> {
		this.mockDelete(id);

		return Promise.resolve(true);
	}

	async findByCriteria(query: UserCriteriaQuery): Promise<CriteriaResult<UserEntity>> {
		this.mockMatching(query);

		const data = this.users;
		const count = this.users.length;

		return Promise.resolve({ data, count });
	}

	async findByEmail(email: string): Promise<Nullable<UserEntity>> {
		return Promise.resolve(this.mockSearch(email));
	}

	async findById(id: string): Promise<Nullable<UserEntity>> {
		return Promise.resolve(this.mockSearch(id));
	}

	async softDelete(id: string): Promise<boolean> {
		this.mockDelete(id);

		return Promise.resolve(true);
	}

	async update(id: string, request: UpdateUserRequest): Promise<UserEntity> {
		const updatedUser = { id, ...request } as UserEntity;

		this.mockSave(updatedUser);

		return Promise.resolve(updatedUser);
	}

	async updatePassword(
		user: UserEntity,
		request: UpdateUserPasswordRequest | UpdateUserForgotPasswordRequest,
	): Promise<UserEntity> {
		const mergedUser = { ...user, ...request } as UserEntity;

		this.mockSave(mergedUser);

		return Promise.resolve(mergedUser);
	}

	assertLastSavedUserIs(expectedUser: UserEntity): void {
		const mock = this.mockSave.mock;
		const lastSavedUser = mock.calls[mock.calls.length - 1][0] as UserEntity;

		expect(lastSavedUser.id).toEqual(expectedUser.id);
	}

	assertLastDeletedUserIs(expectedUser: UserEntity): void {
		const mock = this.mockDelete.mock;
		const lastDeletedUserId = mock.calls[mock.calls.length - 1][0] as string;

		expect(lastDeletedUserId).toEqual(expectedUser.id);
	}

	whenSearchThenReturn(value: Nullable<UserEntity>): void {
		this.mockSearch.mockReturnValue(value);
	}

	whenSearchByCriteriaThenReturn(values: Array<UserEntity>): void {
		this.users = values;

		this.mockMatching.mockReturnValue(values);
	}

	assertLastSearchedUserIs(value: string): void {
		expect(this.mockSearch).toHaveBeenCalledWith(value);
	}

	assertResultIsEqual<T>(expectedResult: T, result: T): void {
		expect(expectedResult).toEqual(result);
	}

	mockSaveThrowUserWithEmailAlreadyExistsException(email: string): void {
		this.mockSave.mockImplementation(() => {
			throw new UserWithEmailAlreadyExistsException(context, email);
		});
	}

	mockSaveThrowInvalidCredentialsException(): void {
		this.mockSave.mockImplementation(() => {
			throw new InvalidCredentialsException(context);
		});
	}

	mockDeleteThrowUserWithIdNotExistsException(id: string): void {
		this.mockDelete.mockImplementation(() => {
			throw new UserWithIdNotExistsException(context, id);
		});
	}
}
