import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminUserEntity } from './persistence/admin-user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([AdminUserEntity])],
})
export class AdminUsersModule {}
