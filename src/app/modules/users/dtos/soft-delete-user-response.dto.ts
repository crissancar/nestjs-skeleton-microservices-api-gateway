import { ApiProperty } from '@nestjs/swagger';

import { userPropertiesSwagger } from '../config/swagger/properties/user-properties.swagger';

const { softDeletedMessage } = userPropertiesSwagger;

export class SoftDeleteUserResponse {
	@ApiProperty(softDeletedMessage)
	readonly message: string;

	constructor(message: string) {
		this.message = message;
	}

	static create(id: string): SoftDeleteUserResponse {
		const message = `User with id <${id}> soft deleted`;

		return new SoftDeleteUserResponse(message);
	}
}
