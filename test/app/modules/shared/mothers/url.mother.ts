import { MotherCreator } from '../services/mother-creator.service';

export class URLMother {
	static random(): string {
		return MotherCreator.random().internet.url();
	}
}
