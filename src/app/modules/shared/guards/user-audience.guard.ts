import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { FindUserForStrategyResponse } from '../../users/dtos/find-user-for-strategy-response.dto';
import { userAudienceGuardConstants } from '../config/constants/user-audience-guard.constants';
import { UserAudiences } from '../enums/user-audiences.enum';
import { InvalidUserAudienceException } from '../exceptions/invalid-user-audience.exception';

const { context } = userAudienceGuardConstants;

@Injectable()
export class UserAudienceGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const validAudiences = this.reflector.get<Array<string>>('audiences', context.getHandler());

		const userAudiences = this.getUserAudiences(context);

		this.checkUserAudiences(userAudiences, validAudiences);

		return true;
	}

	private getUserAudiences(context: ExecutionContext): Array<UserAudiences> {
		const request = context.switchToHttp().getRequest<Request>();

		const user = request.authUser as FindUserForStrategyResponse;

		return user.audiences;
	}

	private checkUserAudiences(
		userAudiences: Array<UserAudiences>,
		validAudiences: Array<string>,
	): void {
		if (!this.areValidAudiences(userAudiences, validAudiences)) {
			throw new InvalidUserAudienceException(context);
		}
	}

	private areValidAudiences(
		userAudiences: Array<UserAudiences>,
		validAudiences: Array<string>,
	): boolean {
		const result = userAudiences.map((audience) => validAudiences.includes(audience));

		return !result.includes(false);
	}
}
