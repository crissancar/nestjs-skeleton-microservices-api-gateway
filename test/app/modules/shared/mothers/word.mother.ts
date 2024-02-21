import { MotherCreator } from '../services/mother-creator.service';

export class WordMother {
	static random(): string {
		return MotherCreator.random().lorem.word();
	}
}
