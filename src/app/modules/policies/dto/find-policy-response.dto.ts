import { ApiProperty } from '@nestjs/swagger';

import { policyPropertiesSwagger } from '../config/swagger/properties/policy-properties.swagger';
import { PolicyEntity } from '../persistence/policy.entity';

const { id, title, description, type, language, url } = policyPropertiesSwagger;

export class FindPolicyResponse {
	@ApiProperty(id)
	readonly id: string;

	@ApiProperty(title)
	readonly title: string;

	@ApiProperty(description)
	readonly description: string;

	@ApiProperty(type)
	readonly type: string;

	@ApiProperty(language)
	readonly language: string;

	@ApiProperty(url)
	readonly url: string;

	constructor(
		id: string,
		title: string,
		description: string,
		type: string,
		language: string,
		url: string,
	) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.type = type;
		this.language = language;
		this.url = url;
	}

	static create(foundPolicy: PolicyEntity): FindPolicyResponse {
		const { id, title, description, url, type, language } = foundPolicy;

		return new FindPolicyResponse(id, title, description, type, language, url);
	}
}
