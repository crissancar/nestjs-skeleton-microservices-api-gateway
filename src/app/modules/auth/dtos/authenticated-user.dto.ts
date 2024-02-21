import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { UserAudiences } from '../../shared/enums/user-audiences.enum';
import { UserEntity } from '../../users/persistence/user.entity';

export class AuthenticatedUser {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	id: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsEnum(UserAudiences)
	audiences: Array<UserAudiences>;

	constructor(id: string, name: string, email: string, audiences: Array<UserAudiences>) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.audiences = audiences;
	}

	static create(user: UserEntity): AuthenticatedUser {
		const { id, name, email, audiences } = user;

		return new AuthenticatedUser(id, name, email, audiences);
	}
}
