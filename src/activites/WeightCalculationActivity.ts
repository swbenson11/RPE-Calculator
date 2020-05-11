// There were two goals for this activity.
// 1. Make a working Weight Calculator
// 2. Mess around with functional programing concepts.
// That's why there are two different version of this algorithm. I was trying
// different approaches to functional programming.

// Calculation approach is to break the difference between RPE and targetRPE into
// increments. Then adjust those increments for compounding factors (like how tired
// you are from your last set) then multiply  for a factory of the weight. So the more
// weight you are using, the greater the increments are worth
import { pipe } from 'ramda';

const LOWEST_WEIGHT_MULTIPLE = 5;

// Standard function that internally makes use of
// Function composition and partial application to pipe parts of the
// calculation together.
export const WeightCalculationActivity = (
  reps: number,
  weight: number,
  RPE: number,
  targetRPE: number
) => {
  //use closure to create curried functions
  const incrementCalculation = (x: number) => calculateIncrements(RPE, x);
  const adjustmentForFatigue = (x: number) => adjustForPreviousRPE(x, RPE);
  const adjustmentForReps = (x: number) => adjustForPreviousReps(x, reps);
  const weightCalculation = (x: number) => calculateTotalWeight(x, weight);

  const calculation = pipe(
    incrementCalculation,
    adjustmentForFatigue,
    adjustmentForReps,
    weightCalculation,
    normalizeWeight
  );
  return calculation(targetRPE);
};

// Here I tried to make a curried version of the same algorithm
// Readability suffers and you lose some IDE safety
export const CurriedWeightCalculationActivity = (targetRPE: number) => (
  RPE: number
) => (reps: number) => (weight: number) => {
  return normalizeWeight(
    calculateTotalWeight(
      adjustForPreviousReps(
        adjustForPreviousRPE(calculateIncrements(RPE, targetRPE), RPE),
        reps
      ),
      weight
    )
  );
};

const calculateIncrements = (RPE: number, targetRPE: number) => (RPE - targetRPE) * 4;

const adjustForPreviousRPE = (increments: number, RPE: number) => {
  if (RPE < 8) return increments;
  return increments + (RPE - 7.5) * 2;
};

// more reps = more fatigue
const adjustForPreviousReps = (increments: number, reps: number) => {
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
  const x = 0.0083333333;
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
