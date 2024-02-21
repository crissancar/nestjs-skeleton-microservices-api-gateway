import { DataSource, EntitySubscriberInterface, EventSubscriber } from 'typeorm';

import { EntitySubscriberListenTo } from '../../shared/types/entity-subscriber-listen-to.type';
import { ExampleEntity } from './example.entity';

@EventSubscriber()
export class ExampleEntitySubscriber implements EntitySubscriberInterface<ExampleEntity> {
	constructor(private readonly dataSource: DataSource) {
		dataSource.subscribers.push(this);
	}

	listenTo(): EntitySubscriberListenTo {
		return ExampleEntity;
	}
}
