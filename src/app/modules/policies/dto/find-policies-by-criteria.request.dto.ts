import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { ValidatePage } from '../../shared/decorators/validate-page.decorator';
import { ValidateSortColumn } from '../../shared/decorators/validate-sort-column.decorator';
import { ValidateSortOrder } from '../../shared/decorators/validate-sort-order.decorator';
import { ValidateTake } from '../../shared/decorators/validate-take.decorator';
import { SortColumn } from '../../shared/types/sort-column.type';
import { SortOrder } from '../../shared/types/sort-order.type';
import { policyPropertiesSwagger } from '../config/swagger/properties/policy-properties.swagger';
import { PolicyLanguages } from '../enums/policy-languages.enum';
import { PolicyTypes } from '../enums/policy-types.enum';
import { PolicyEntity } from '../persistence/policy.entity';

const { type, language, take, page, sortOrder, sortColumn } = policyPropertiesSwagger;

export class FindPoliciesByCriteriaRequest {
	@ApiProperty(type)
	@IsOptional()
	@IsEnum(PolicyTypes)
	readonly type?: PolicyTypes;

	@ApiProperty(language)
	@IsOptional()
	@IsEnum(PolicyLanguages)
	readonly language?: PolicyLanguages;

	@ApiProperty(sortColumn)
	@ValidateSortColumn(PolicyEntity)
	readonly sortColumn?: SortColumn<PolicyEntity>;

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
