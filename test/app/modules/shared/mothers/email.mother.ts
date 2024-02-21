import { MotherCreator } from '../services/mother-creator.service';

export class EmailMother {
	static random(): string {
		return MotherCreator.random().internet.email();
	}
}
