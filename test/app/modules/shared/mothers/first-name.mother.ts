import { MotherCreator } from '../services/mother-creator.service';

export class FirstNameMother {
	static random(): string {
		return MotherCreator.random().person.firstName();
	}
}
