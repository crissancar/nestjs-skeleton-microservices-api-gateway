import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { ValidatePage } from '../../shared/decorators/validate-page.decorator';
import { ValidateSortColumn } from '../../shared/decorators/validate-sort-column.decorator';
import { ValidateSortOrder } from '../../shared/decorators/validate-sort-order.decorator';
import { ValidateTake } from '../../shared/decorators/validate-take.decorator';
import { SortColumn } from '../../shared/types/sort-column.type';
import { SortOrder } from '../../shared/types/sort-order.type';
import { examplePropertiesSwagger } from '../config/swagger/properties/example-properties.swagger';
import { ExampleEntity } from '../persistence/example.entity';

const { name, take, page, sortOrder, sortColumn } = examplePropertiesSwagger;

export class FindExamplesByCriteriaRequest {
	@ApiProperty(name)
	@IsOptional()
	@IsString()
	readonly name?: string;

	@ApiProperty(sortColumn)
	@ValidateSortColumn(ExampleEntity)
	readonly sortColumn?: SortColumn<ExampleEntity>;

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
