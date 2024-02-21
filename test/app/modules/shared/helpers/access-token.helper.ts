import { AuthenticatedUser } from '../../../../../src/app/modules/auth/dtos/authenticated-user.dto';
import { JwtCreator } from '../../../../../src/app/modules/auth/services/jwt-creator.service';
import { AppStorage } from '../storages/app.storage';

export class AccessTokenHelper {
	static create(user: AuthenticatedUser): string {
		const creator = AppStorage.app.get(JwtCreator);

		const token = creator.run(user);

		return token.accessToken;
	}
}
