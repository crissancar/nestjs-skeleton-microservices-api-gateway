import { MotherCreator } from '../services/mother-creator.service';

export class NumberMother {
	static random(min?: number, max?: number): number {
		return MotherCreator.random().number.int({ min, max });
	}

	static randomWithDecimals(): number {
		return MotherCreator.random().number.float({ min: 10, max: 1000, precision: 0.01 });
	}
}
