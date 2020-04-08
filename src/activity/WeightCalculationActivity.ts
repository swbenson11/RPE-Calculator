const LOWEST_WEIGHT_MULTIPLE = 5;

//TODO write tests
// Make sure this works with adding and removing wegiht
//TODO Make this super functional

//BUG - we assume reps are always the same
export const WeightCalculationActivity = (
  reps: number,
  weight: number,
  rpe: number,
  targetRpe: number
) => {
  let value = calculateIncrements(rpe, targetRpe);
  value = adjustForPreviousFatigue(value, rpe);
  value = adjustForReps(value, reps);
  value = calculateTotalWeight(value, weight);
  value = normalizeWeight(value);
  return value;
};

const calculateIncrements = (rpe: number, targetRpe: number) => (rpe - targetRpe) * 4;

const adjustForPreviousFatigue = (increments: number, rpe: number) => {
  if (rpe < 8) return increments;
  return increments + (rpe - 7.5) * 2;
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
  return weight * x * Math.pow(1 + (-200 + weight) / 1500, 2);
};

// TODO add "egoLift attribute to effect rounding"
const normalizeWeight = (weight: number) =>
  Math.floor(weight / LOWEST_WEIGHT_MULTIPLE) * LOWEST_WEIGHT_MULTIPLE;

export default WeightCalculationActivity;
