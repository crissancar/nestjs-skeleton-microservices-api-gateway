import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsOptional, IsString } from 'class-validator';

import { UserEntity } from '../../users/persistence/user.entity';
import { imagePropertiesSwagger } from '../config/swagger/properties/image-properties.swagger';

const { name, image } = imagePropertiesSwagger;

export class CreateImageRequest {
	@IsOptional()
	readonly id: string;

	@IsOptional()
	readonly user: UserEntity;

	@ApiProperty(image)
	@IsEmpty()
	readonly image?: Express.Multer.File;

	@IsOptional()
	readonly uploadedFile?: Express.Multer.File;

	@ApiProperty(name)
	@IsOptional()
	@IsString()
	readonly name: string;

	@IsString()
	readonly profile: string;
}
