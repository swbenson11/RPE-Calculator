import { WeightCalculationActivity } from './WeightCalculationActivity';

export const CalculateEntireWorkout: any = (
  reps: number,
  warmupWeight: number,
  warmupRPE: number,
  targetRPE: number,
  sets: number
) => {
  const currentWeight = WeightCalculationActivity(
    reps,
    warmupWeight,
    warmupRPE,
    targetRPE
  );
  if (sets <= 1) {
    return [currentWeight];
  }
  return [
    currentWeight,
    ...CalculateEntireWorkout(reps, currentWeight, targetRPE, targetRPE, sets - 1),
  ];
};
