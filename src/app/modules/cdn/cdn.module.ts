import { Module } from '@nestjs/common';

import { CDNPathsCreator } from './services/cdn-paths-creator.service';
import { CDNPersister } from './services/cdn-persister.service';

@Module({
	providers: [CDNPersister, CDNPathsCreator],
	exports: [CDNPersister, CDNPathsCreator],
})
export class CDNModule {}
