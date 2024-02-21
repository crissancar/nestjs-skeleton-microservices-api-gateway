import { ForgotPasswordEntity } from '../persistence/forgot-password.entity';

export interface ForgotPasswordMailer {
	created(forgotPassword: ForgotPasswordEntity): Promise<void>;
}
