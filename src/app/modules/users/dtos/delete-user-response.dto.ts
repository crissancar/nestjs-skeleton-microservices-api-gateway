import { ApiProperty } from '@nestjs/swagger';

import { userPropertiesSwagger } from '../config/swagger/properties/user-properties.swagger';

const { deletedMessage } = userPropertiesSwagger;

export class DeleteUserResponse {
	@ApiProperty(deletedMessage)
	readonly message: string;

	constructor(message: string) {
		this.message = message;
	}

	static create(id: string): DeleteUserResponse {
		const message = `User with id <${id}> deleted`;

		return new DeleteUserResponse(message);
	}
}
