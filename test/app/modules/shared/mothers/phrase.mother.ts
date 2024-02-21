import { MotherCreator } from '../services/mother-creator.service';

export class PhraseMother {
	static random(): string {
		return MotherCreator.random().lorem.sentence();
	}
}
