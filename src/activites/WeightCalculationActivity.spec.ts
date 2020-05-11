/*
So this is a testing file for the weight calculation.
This is hard to test because of all the possible variables, and values that
this code can produce. I'm trying to turn my "feels" in the gym into a
mathematical formula.

My testing approach was to first ensure that the increment value is being
calculated correctly. Exporting this kinda breaks the encapsulation of this
code, but I was using TDD to develop it and the whole point of function code is
to break your logic down into reusable parts.

Once I had my increments calculated, I set up an algorithm to determine the weight
calculation. This is where is gets tricky. I made a series of tests, each isolating
for a specific factor. I then ran it against test data from training. From that test
data I was able to tune specific parts of the calculation so that it matched the
results I saw in the gym. The reason individual methods aren't tested (except
CalculateIncrementValue) is that I was tuning the whole of them to match an output,
and didn't want a bunch of super specific tests coupled to individual private functions.
*/

import {
  WeightCalculationActivity,
  CalculateIncrementValue,
  CurriedWeightCalculationActivity,
} from './WeightCalculationActivity';

describe('WeightCalculationActivity', () => {
  // logic without exponential growth of increment values:
  // 450 should be around 3.75 pound increments
  // 300 should be 2.5 pound increments,
  // 150 should be 1.5

  it('calculates weight 200 correctly', () => {
    const calculation = CalculateIncrementValue(200);
    const roundedValue = Math.round(calculation * 10) / 10;

    expect(roundedValue).toBe(1.7);
  });

  it('calculates weight 300 correctly', () => {
    expect(CalculateIncrementValue(300)).toBeGreaterThan(2.5);
  });

  it('calculates weight 450 correctly', () => {
    // This old_increment_increase ensure that the increment value is growing
    const old_increment_increase = CalculateIncrementValue(300) - 2.5;
    expect(CalculateIncrementValue(450)).toBeGreaterThan(
      3.75 + old_increment_increase
    );
  });

  it('calculates weight 150 correctly', () => {
    expect(CalculateIncrementValue(150)).toBeLessThan(1.25);
  });

  it('calculates less than 80', () => {
    const old_increment_decrease = CalculateIncrementValue(150) - 1.25;
    expect(CalculateIncrementValue(80)).toBeLessThan(1 + old_increment_decrease);
  });
});

describe('WeightCalculationActivity', () => {
  describe('Single factor tests', () => {
    describe('Static RPE, average weight', () => {
      it('returns the start weight with low rpe, medium reps', () => {
        const weightRanges = [100, 200, 300, 400, 500];

        weightRanges.forEach((weight) => {
          const calculated = WeightCalculationActivity(5, weight, 7, 7);
          expect(calculated).toBe(weight);
        });
      });
    });

    describe('Different reps', () => {
      it('increases drop for high reps', () => {
        const weightRanges = [
          { weight: 100, correct: 95 },
          { weight: 200, correct: 190 },
          { weight: 300, correct: 285 },
          { weight: 400, correct: 380 },
          { weight: 500, correct: 470 },
        ];

        weightRanges.forEach((pair) => {
          const calculated = WeightCalculationActivity(8, pair.weight, 8, 8);
          expect(calculated).toBe(pair.correct);
        });
      });

      it('decreases drops for low reps', () => {
        const weightRanges = [
          { weight: 100, correct: 100 },
          { weight: 200, correct: 200 },
          { weight: 300, correct: 300 },
          { weight: 400, correct: 400 },
          { weight: 500, correct: 500 },
        ];

        weightRanges.forEach((pair) => {
          const calculated = WeightCalculationActivity(3, pair.weight, 8, 8);
          expect(calculated).toBe(pair.correct);
        });
      });

      describe('Different rpe', () => {
        it('reduces weight for a lower rpe', () => {
          const weightRanges = [
            { weight: 100, correct: 95 },
            { weight: 200, correct: 190 },
            { weight: 300, correct: 285 },
            { weight: 400, correct: 380 },
            { weight: 500, correct: 470 },
          ];

          weightRanges.forEach((pair) => {
            const calculated = WeightCalculationActivity(5, pair.weight, 8, 7);
            expect(calculated).toBe(pair.correct);
          });
        });

        it('increases weight for a higher rpe', () => {
          const weightRanges = [
            { weight: 100, correct: 105 },
            { weight: 200, correct: 215 },
            { weight: 300, correct: 325 },
            { weight: 400, correct: 435 },
            { weight: 500, correct: 550 },
          ];

          weightRanges.forEach((pair) => {
            const calculated = WeightCalculationActivity(5, pair.weight, 7, 9);
            expect(calculated).toBe(pair.correct);
          });
        });
      });

      describe('High RPE', () => {
        it('increases drop for 9', () => {
          const weightRanges = [
            { weight: 100, correct: 95 },
            { weight: 200, correct: 195 },
            { weight: 300, correct: 290 },
            { weight: 400, correct: 385 },
            { weight: 500, correct: 480 },
          ];

          weightRanges.forEach((pair) => {
            const calculated = WeightCalculationActivity(5, pair.weight, 9, 9);
            expect(calculated).toBe(pair.correct);
          });
        });

        it('increases drop even more for 10', () => {
          const weightRanges = [
            { weight: 100, correct: 95 },
            { weight: 200, correct: 190 },
            { weight: 300, correct: 285 },
            { weight: 400, correct: 380 },
            { weight: 500, correct: 470 },
          ];

          weightRanges.forEach((pair) => {
            const calculated = WeightCalculationActivity(5, pair.weight, 10, 10);
            expect(calculated).toBe(pair.correct);
          });
        });
      });
    });

    describe('Multi factory tests', () => {
      describe('High RPE + lower target', () => {
        it('increases drop for 9', () => {
          const weightRanges = [
            { weight: 100, correct: 90 },
            { weight: 200, correct: 180 },
            { weight: 300, correct: 265 },
            { weight: 400, correct: 345 },
            { weight: 500, correct: 420 },
          ];

          weightRanges.forEach((pair) => {
            const calculated = WeightCalculationActivity(5, pair.weight, 10, 8);
            expect(calculated).toBe(pair.correct);
          });
        });
      });
    });
  });
});

describe('Currying tests', () => {
  const reps = 8;
  const RPE = 9;
  const targetRPE = 10;
  const weightRanges = [100, 200, 300, 400, 500];

  describe('CurriedWeightCalculationActivity', () => {
    it('produces the same results as WeightCalculationActivity', () => {
      weightRanges.forEach((weight) => {
        const curried = CurriedWeightCalculationActivity(targetRPE)(RPE)(reps)(
          weight
        );
        const nonCurried = WeightCalculationActivity(reps, weight, RPE, targetRPE);
        expect(curried).toBe(nonCurried);
      });
    });
  });

  describe('Partial Implementation', () => {
    it('produces the same results as WeightCalculationActivity', () => {
      const RPE7Calculation = (RPE: number) => (reps: number) => (weight: number) => {
        CurriedWeightCalculationActivity(7)(weight)(RPE)(targetRPE);

        weightRanges.forEach((weight) => {
          const curried = RPE7Calculation(RPE)(reps)(weight);
          const nonCurried = WeightCalculationActivity(reps, weight, RPE, targetRPE);
          expect(curried).toBe(nonCurried);
        });
      };
    });
  });
});
