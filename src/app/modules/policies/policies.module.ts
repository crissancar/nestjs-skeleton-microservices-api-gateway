import { Module } from '@nestjs/common';
import { ClientProviderOptions, ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PolicyGetController } from './controllers/policy-get.controller';
import { PolicyEntity } from './persistence/policy.entity';
import { TypeOrmPolicyRepository } from './persistence/typeorm-policy.repository';
import { PoliciesFinderByCriteria } from './services/policies-finder-by-criteria.service';

function clientFactory(name: string, queue: string): ClientProviderOptions {
	return {
		name,
		transport: Transport.RMQ,
		options: {
			urls: ['amqps://qagxqjke:XuoOJiC3RCN2C0E_oNuEWv1KZ6y4NGem@rat.rmq2.cloudamqp.com/qagxqjke'],
			queue,
			queueOptions: {
				durable: false,
			},
		},
	};
}
@Module({
	imports: [
		TypeOrmModule.forFeature([PolicyEntity]),
		ClientsModule.register([clientFactory('CLIENT_POLICY_TRIAL', 'policy_trial_queue')]),
	],
	controllers: [PolicyGetController],
	providers: [
		PoliciesFinderByCriteria,
		{ provide: 'PolicyRepository', useClass: TypeOrmPolicyRepository },
	],
})
export class PoliciesModule {}
