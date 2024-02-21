import { UserEntity } from '../persistence/user.entity';

export interface UserMailer {
	created(user: UserEntity): Promise<void>;
}
