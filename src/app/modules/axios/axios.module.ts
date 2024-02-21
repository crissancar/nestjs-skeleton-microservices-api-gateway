import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { httpConfig } from './config/http.config';
import { AxiosFetcher } from './services/axios-fetcher.service';

@Module({
	imports: [HttpModule.register(httpConfig)],
	providers: [AxiosFetcher],
	exports: [HttpModule, AxiosFetcher],
})
export class AxiosModule {}
