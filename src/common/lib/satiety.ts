import { SatietyCalculatorThreshold } from '@/common/types/calculator.types';

import { calculators } from './calculators';

/**
 * Function to estimate a daily energy intake from a body weight
 */
export const getDailyKcal = (weightKg: number): number =>
  weightKg * calculators.satiety.dailyKcalPerKg;

/**
 * Function to get a satiety threshold for a dish energy and a body weight
 */
export const getSatietyThreshold = (
  energyKcal: number,
  weightKg: number,
): SatietyCalculatorThreshold => {
  const ratio = energyKcal / getDailyKcal(weightKg);
  const { thresholds } = calculators.satiety;

  // The last threshold has no upper limit, so it is used when no other one matches
  return (
    thresholds.find(
      (threshold) =>
        threshold.maxDishToDailyRatio === null || ratio <= threshold.maxDishToDailyRatio,
    ) ?? thresholds[thresholds.length - 1]
  );
};
