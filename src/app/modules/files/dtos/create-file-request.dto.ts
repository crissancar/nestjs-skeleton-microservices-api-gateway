import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsOptional, IsString } from 'class-validator';

import { UserEntity } from '../../users/persistence/user.entity';
import { filePropertiesSwagger } from '../config/swagger/properties/file-properties.swagger';

const { description, title, file } = filePropertiesSwagger;

export class CreateFileRequest {
	@IsOptional()
	readonly id: string;

	@IsOptional()
	readonly user: UserEntity;

	@ApiProperty(file)
	@IsEmpty()
	readonly file?: Express.Multer.File;

	@IsOptional()
	readonly uploadedFile?: Express.Multer.File;

	@ApiProperty(title)
	@IsString()
	readonly title: string;

	@ApiProperty(description)
	@IsString()
	readonly description: string;
}
