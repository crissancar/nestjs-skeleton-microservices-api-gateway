import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { ValidatePage } from '../../shared/decorators/validate-page.decorator';
import { ValidateSortColumn } from '../../shared/decorators/validate-sort-column.decorator';
import { ValidateSortOrder } from '../../shared/decorators/validate-sort-order.decorator';
import { ValidateTake } from '../../shared/decorators/validate-take.decorator';
import { SortColumn } from '../../shared/types/sort-column.type';
import { SortOrder } from '../../shared/types/sort-order.type';
import { filePropertiesSwagger } from '../config/swagger/properties/file-properties.swagger';
import { FileEntity } from '../persistence/file.entity';

const { user, keyword, take, page, sortMimetype, sortColumn, sortOrder, mimetype } =
	filePropertiesSwagger;

export class FindFilesByCriteriaRequest {
	@ApiProperty(mimetype)
	@IsOptional()
	@IsString()
	readonly mimetype?: string;

	@ApiProperty(user)
	@IsOptional()
	@IsString()
	readonly user?: string;

	@ApiProperty(keyword)
	@IsOptional()
	@IsString()
	readonly keyword?: string;

	@ApiProperty(sortMimetype)
	@IsOptional()
	@IsString()
	readonly sortMimetype?: string;

	@ApiProperty(sortColumn)
	@ValidateSortColumn(FileEntity)
	readonly sortColumn?: SortColumn<FileEntity>;

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
