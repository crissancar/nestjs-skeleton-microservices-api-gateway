import { sharedPropertiesSwagger } from '../../../../shared/config/swagger/shared-properties.swagger';
import { userPropertiesSwagger } from '../../../../users/config/swagger/properties/user-properties.swagger';

const { email, password } = userPropertiesSwagger;

export const forgotPasswordPropertiesSwagger = {
	...sharedPropertiesSwagger,
	email,
	password,
	message: {
		type: String,
		example: 'Forgot password completed',
		required: true,
	},
};
