import { UserEntity } from '../../users/persistence/user.entity';
import { ForgotPasswordEntity } from '../persistence/forgot-password.entity';

export interface ForgotPasswordRepository {
	create(forgotPassword: ForgotPasswordEntity): Promise<ForgotPasswordEntity>;
	delete(id: string): Promise<boolean>;
	find(id: string): Promise<ForgotPasswordEntity>;
	resolveUser(email: string): Promise<UserEntity>;
}
