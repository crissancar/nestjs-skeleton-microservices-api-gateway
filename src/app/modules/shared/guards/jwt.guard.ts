import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { InvalidTokenException } from '../../auth/exceptions/invalid-token.exception';
import { UserEntity } from '../../users/persistence/user.entity';
import { jwtGuardConstants } from '../config/constants/jwt-guard.constants';

const { context, passportStrategy } = jwtGuardConstants;

@Injectable()
export class JwtGuard extends AuthGuard(passportStrategy) {
	// @ts-ignore
	handleRequest(
		error: unknown,
		user: UserEntity,
		info: unknown,
		executionContext: ExecutionContext,
	): UserEntity {
		const request = executionContext.switchToHttp().getRequest<Request>();

		if (!user) {
			throw new InvalidTokenException(context);
		}

		request.authUser = user;

		return user;
	}
}
