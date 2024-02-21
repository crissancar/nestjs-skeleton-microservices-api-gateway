import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { ValidatePage } from '../../shared/decorators/validate-page.decorator';
import { ValidateSortColumn } from '../../shared/decorators/validate-sort-column.decorator';
import { ValidateSortOrder } from '../../shared/decorators/validate-sort-order.decorator';
import { ValidateTake } from '../../shared/decorators/validate-take.decorator';
import { SortColumn } from '../../shared/types/sort-column.type';
import { SortOrder } from '../../shared/types/sort-order.type';
import { imagePropertiesSwagger } from '../config/swagger/properties/image-properties.swagger';
import { ImageEntity } from '../persistence/image.entity';

const { name, take, page, sortColumn, sortOrder } = imagePropertiesSwagger;

export class FindImagesByCriteriaRequest {
	@ApiProperty(name)
	@IsOptional()
	@IsString()
	readonly name?: string;

	@ApiProperty(sortColumn)
	@ValidateSortColumn(ImageEntity)
	readonly sortColumn?: SortColumn<ImageEntity>;

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
