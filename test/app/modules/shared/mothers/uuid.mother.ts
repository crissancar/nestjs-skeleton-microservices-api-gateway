import { MotherCreator } from '../services/mother-creator.service';

export class UuidMother {
	static random(): string {
		return MotherCreator.random().string.uuid();
	}
}
