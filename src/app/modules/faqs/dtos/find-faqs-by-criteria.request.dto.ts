import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { ValidatePage } from '../../shared/decorators/validate-page.decorator';
import { ValidateSortColumn } from '../../shared/decorators/validate-sort-column.decorator';
import { ValidateSortOrder } from '../../shared/decorators/validate-sort-order.decorator';
import { ValidateTake } from '../../shared/decorators/validate-take.decorator';
import { SortColumn } from '../../shared/types/sort-column.type';
import { SortOrder } from '../../shared/types/sort-order.type';
import { faqPropertiesSwagger } from '../config/swagger/properties/faq-properties.swagger';
import { FAQLanguages } from '../enums/faq-languages.enum';
import { FAQEntity } from '../persistence/faq.entity';

const { language, take, page, sortOrder, sortColumn } = faqPropertiesSwagger;

export class FindFAQsByCriteriaRequest {
	@ApiProperty(language)
	@IsOptional()
	@IsEnum(FAQLanguages)
	readonly language?: FAQLanguages;

	@ApiProperty(sortColumn)
	@ValidateSortColumn(FAQEntity)
	readonly sortColumn?: SortColumn<FAQEntity>;

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
