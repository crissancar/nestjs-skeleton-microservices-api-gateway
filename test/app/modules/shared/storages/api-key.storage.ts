import generateApiKey from 'generate-api-key';
import { DataSource } from 'typeorm';

import { ApiKeyAudiences } from '../../../../../src/app/modules/api-keys/enums/api-key-audiences.enum';
import { ApiKeyEntity } from '../../../../../src/app/modules/api-keys/persistence/api-key.entity';
import { Crypto } from '../../../../../src/app/modules/shared/services/crypto.service';

export class ApiKeyStorage {
	private static _apiKey: string;

	static async storeApiKey(dataSource: DataSource): Promise<void> {
		const repository = dataSource.getRepository(ApiKeyEntity);

		let apiKeyEntity = await repository.findOneBy({});
		if (!apiKeyEntity) {
			const client = 'Kubide';
			const description = 'Testing key';
			const generatedKey = generateApiKey({ method: 'base62' }) as string;
			const key = Crypto.cipher(generatedKey);
			const audience = ApiKeyAudiences.GENERAL;

			apiKeyEntity = await repository.save({ client, description, key, audience });
		}
		this.apiKey = Crypto.decipher(apiKeyEntity.key);
	}

	static get apiKey(): string {
		return this._apiKey;
	}

	private static set apiKey(value: string) {
		this._apiKey = value;
	}
}
