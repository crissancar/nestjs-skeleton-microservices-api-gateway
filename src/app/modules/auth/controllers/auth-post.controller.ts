import { Controller, Post } from '@nestjs/common';

import { ApiKeyAudiences } from '../../api-keys/enums/api-key-audiences.enum';
import { EndpointAuthentication } from '../../shared/decorators/endpoint-authentication.decorator';
import { UserAudiences } from '../../shared/enums/user-audiences.enum';
import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { authConfig } from '../config/auth.config';
import { LoginSwagger } from '../config/swagger/decorators/login-swagger.decorator';
import { RefreshTokenSwagger } from '../config/swagger/decorators/refresh-swagger.decorator';
import { AuthUser } from '../decorators/auth-user.decorator';
import { LoginAuthentication } from '../decorators/login-authentication.decorator';
import { AuthenticatedUser } from '../dtos/authenticated-user.dto';
import { LoginUserResponse } from '../dtos/login-user.response.dto';
import { Token } from '../interfaces/token.interface';
import { JwtCreator } from '../services/jwt-creator.service';

const { globalRoute, postController } = authConfig;
const { context, routes } = postController.constants;
const { login, refresh } = postController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class AuthPostController {
	constructor(private readonly jwtCreator: JwtCreator) {}

	@LoginSwagger()
	@LoginAuthentication(ApiKeyAudiences.ADMIN, ApiKeyAudiences.GENERAL)
	@Post(routes.login)
	login(@AuthUser() authUser: AuthenticatedUser): LoginUserResponse {
		logger.log(login.requestLog);

		return this.jwtCreator.run(authUser);
	}

	@RefreshTokenSwagger()
	@EndpointAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@Post(routes.refreshToken)
	refreshToken(@AuthUser() authUser: AuthenticatedUser): Token {
		logger.log(refresh.requestLog);

		return this.jwtCreator.run(authUser);
	}
}
