import { IsNotEmpty, IsString } from 'class-validator';

export class FindExampleByIdRequest {
	@IsNotEmpty()
	@IsString()
	readonly id: string;

	constructor(id: string) {
		this.id = id;
	}

	static create(id: string): FindExampleByIdRequest {
		return new FindExampleByIdRequest(id);
	}
}
