import { MotherCreator } from '../services/mother-creator.service';

export class PasswordMother {
	static random(): string {
		return MotherCreator.random().internet.password({ length: 10 });
	}
}
