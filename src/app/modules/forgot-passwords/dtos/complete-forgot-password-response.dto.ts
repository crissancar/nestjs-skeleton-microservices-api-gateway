import { ApiProperty } from '@nestjs/swagger';

import { forgotPasswordPropertiesSwagger } from '../config/swagger/properties/forgot-password-properties.swagger';

const { message } = forgotPasswordPropertiesSwagger;

export class CompleteForgotPasswordResponse {
	@ApiProperty(message)
	readonly message: string;

	constructor(message: string) {
		this.message = message;
	}

	static create(): CompleteForgotPasswordResponse {
		return new CompleteForgotPasswordResponse('Forgot password completed');
	}
}
