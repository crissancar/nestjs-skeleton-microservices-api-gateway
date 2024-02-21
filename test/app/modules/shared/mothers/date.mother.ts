import { MotherCreator } from '../services/mother-creator.service';

export class DateMother {
	static soon(): Date {
		return MotherCreator.random().date.soon();
	}
}
