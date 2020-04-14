import { CalculateEntireWorkout } from './CalculateEntireWorkoutActivity';
import WeightCalculationActivity from './WeightCalculationActivity';

it('properly calculates an entire workout ', () => {
  const warmupWeight = 250;
  const warmupRPE = 7;
  const sets = 5;
  const reps = 5;
  const targetRPE = 9;
  const correctValues = [
    WeightCalculationActivity(reps, warmupWeight, warmupRPE, targetRPE),
  ];
  for (let i = 1; i < 5; i++) {
    const prevWeight = correctValues[i - 1];
    correctValues.push(
      WeightCalculationActivity(reps, prevWeight, targetRPE, targetRPE)
    );
  }

  expect(
    CalculateEntireWorkout(reps, warmupWeight, warmupRPE, targetRPE, sets)
  ).toEqual(correctValues);
});
