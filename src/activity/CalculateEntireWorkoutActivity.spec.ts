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

  // Dumb experiment to generate this with reduce.
  // let correctValues = [
  //   WeightCalculationActivity(reps, warmupWeight, warmupRPE, targetRPE),
  // ];
  // [1, 2, 3, 4].reduce((previousWeight, index) => {
  //   let weight = WeightCalculationActivity(
  //     reps,
  //     previousWeight,
  //     targetRPE,
  //     targetRPE
  //   );
  //   correctValues.push(weight);
  //   return weight;
  // }, correctValues[0]);

  expect(
    CalculateEntireWorkout(reps, warmupWeight, warmupRPE, targetRPE, sets)
  ).toEqual(correctValues);
});
