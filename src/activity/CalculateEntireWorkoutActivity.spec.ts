import { CalculateEntireWorkout } from './CalculateEntireWorkoutActivity';
import WeightCalculationActivity from './WeightCalculationActivity';

it('properly calculates an entire workout ', () => {
  let warmupWeight = 250;
  let warmupRPE = 7;
  let sets = 5;
  let reps = 5;
  let targetRPE = 9;
  let correctValues = [
    WeightCalculationActivity(reps, warmupWeight, warmupRPE, targetRPE),
  ];
  for (let i = 1; i < 5; i++) {
    let prevWeight = correctValues[i - 1];
    correctValues.push(
      WeightCalculationActivity(reps, prevWeight, targetRPE, targetRPE)
    );
  }

  expect(
    CalculateEntireWorkout(reps, warmupWeight, warmupRPE, targetRPE, sets)
  ).toEqual(correctValues);
});
