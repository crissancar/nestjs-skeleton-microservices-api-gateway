import * as dotenv from 'dotenv';

import { TypeOrmEnvironmentArranger } from '../typeorm/typeorm-environment-arranger';

dotenv.config({ path: '.env.test' });

export default async (): Promise<void> => {
	await TypeOrmEnvironmentArranger.cleanDatabase();
};
