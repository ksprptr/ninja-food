import { Tone } from '../enums/calculator.enums';

export interface Calculators {
  satiety: SatietyCalculator;
}

export interface SatietyCalculator {
  dailyKcalPerKg: number;
  thresholds: SatietyCalculatorThreshold[];
  disclaimer: string;
}

export interface SatietyCalculatorThreshold {
  id: string;
  maxDishToDailyRatio: number | null;
  label: string;
  tone: Tone;
}
