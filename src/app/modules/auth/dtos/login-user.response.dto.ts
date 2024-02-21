import { ApiProperty } from '@nestjs/swagger';

import { authPropertiesSwagger } from '../config/swagger/properties/auth-properties.swagger';
import { Token } from '../interfaces/token.interface';

const { accessToken, refreshToken } = authPropertiesSwagger;

export class LoginUserResponse {
	@ApiProperty(accessToken)
	readonly accessToken: string;

	@ApiProperty(refreshToken)
	readonly refreshToken: string;

	constructor(accessToken: string, refreshToken: string) {
		this.refreshToken = refreshToken;
	}

	static create(token: Token): LoginUserResponse {
		const { accessToken, refreshToken } = token;

		return new LoginUserResponse(accessToken, refreshToken);
	}
}
