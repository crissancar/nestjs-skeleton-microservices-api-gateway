import { applyDecorators, UseGuards } from '@nestjs/common';

import { JwtGuard } from '../guards/jwt.guard';
import { OwnerGuard } from '../guards/owner.guard';
import { UserAudienceGuard } from '../guards/user-audience.guard';
import { AllowedAudiences } from './allowed-audiences.decorator';

export const EndpointOwnerAuthentication = (...audiences: Array<string>): MethodDecorator =>
	applyDecorators(
		UseGuards(JwtGuard, UserAudienceGuard, OwnerGuard),
		AllowedAudiences(...audiences),
	);
