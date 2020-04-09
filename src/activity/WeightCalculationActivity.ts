import { pipe } from 'ramda';

const LOWEST_WEIGHT_MULTIPLE = 5;

export const WeightCalculationActivity = (
  reps: number,
  weight: number,
  RPE: number,
  targetRPE: number
) => {
  //use closure to create curried functions
  let incrementCalculation = (x: number) => calculateIncrements(RPE, x);
  let adjustmentForFatigue = (x: number) => adjustForPreviousFatigue(x, RPE);
  let adjustmentForReps = (x: number) => adjustForReps(x, reps);
  let weightCalculation = (x: number) => calculateTotalWeight(x, weight);

  let calculation = pipe(
    incrementCalculation,
    adjustmentForFatigue,
    adjustmentForReps,
    weightCalculation,
    normalizeWeight
  );
  return calculation(targetRPE);
};

const calculateIncrements = (RPE: number, targetRPE: number) => (RPE - targetRPE) * 4;

const adjustForPreviousFatigue = (increments: number, RPE: number) => {
  if (RPE < 8) return increments;
  return increments + (RPE - 7.5) * 2;
};

// more reps = more fatigue
const adjustForReps = (increments: number, reps: number) => {
  if (reps <= 3) return increments / 4;
  if (reps > 6) {
    return increments + (reps - 6) * 2;
  }
  return increments;
};

const calculateTotalWeight = (increments: number, weight: number) =>
  weight - increments * CalculateIncrementValue(weight);

// export const CalculateIncrementValue = (weight: number) => weight * 0.0083333333;
export const CalculateIncrementValue = (weight: number) => {
  // x * weight should result in increment of
  //  3.75 for 400, 2.5 pound increments for 300,  1.5 for 150
  let x = 0.0083333333;
  // now we want to make is have a slight exponential growth/decay
  // where the higher above 200 the more the interment is exaggerated

  // Math.min(weight, 120) is done because below a certain point weight
  // has too much bearing on the increments.
  return Math.max(weight, 120) * x * Math.pow(1 + (-200 + weight) / 1500, 2);
};

// TODO add "egoLift" attribute to effect rounding"
const normalizeWeight = (weight: number) => {
  return Math.round(weight / LOWEST_WEIGHT_MULTIPLE) * LOWEST_WEIGHT_MULTIPLE;
};
export default WeightCalculationActivity;
