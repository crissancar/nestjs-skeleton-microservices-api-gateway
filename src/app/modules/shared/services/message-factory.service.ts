import { v4 } from 'uuid';

export interface BaseMessage {
	data: {
		id: string;
		type: string;
		occurredOn: Date;
		attributes: { id?: string; [key: string]: unknown };
		meta: { [key: string]: unknown };
	};
}

export class MessageFactory {
	static create(): string {
		return v4();
	}
}
