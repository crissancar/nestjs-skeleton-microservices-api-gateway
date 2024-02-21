import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

import { ValidatePage } from '../../shared/decorators/validate-page.decorator';
import { ValidateSortColumn } from '../../shared/decorators/validate-sort-column.decorator';
import { ValidateSortOrder } from '../../shared/decorators/validate-sort-order.decorator';
import { ValidateTake } from '../../shared/decorators/validate-take.decorator';
import { SortColumn } from '../../shared/types/sort-column.type';
import { SortOrder } from '../../shared/types/sort-order.type';
import { userPropertiesSwagger } from '../config/swagger/properties/user-properties.swagger';
import { UserEntity } from '../persistence/user.entity';

const { name, keyword, email, take, page, sortName, sortOrder, sortColumn } = userPropertiesSwagger;

export class FindUsersByCriteriaRequest {
	@ApiProperty(name)
	@IsOptional()
	@IsString()
	readonly name?: string;

	@ApiProperty(email)
	@IsOptional()
	@IsEmail()
	readonly email?: string;

	@ApiProperty(keyword)
	@IsOptional()
	@IsString()
	readonly keyword?: string;

	@ApiProperty(sortName)
	@IsOptional()
	@IsString()
	readonly sortName?: string;

	@ApiProperty(sortColumn)
	@ValidateSortColumn(UserEntity)
	readonly sortColumn?: SortColumn<UserEntity>;

	@ApiProperty(sortOrder)
	@ValidateSortOrder()
	readonly sortOrder?: SortOrder;

	@ApiProperty(take)
	@ValidateTake()
	readonly take?: number;

	@ApiProperty(page)
	@ValidatePage()
	readonly page?: number;
}
