// So this is a testing file for the weight calculation.
// This is hard to test because of all the possible variables, and values that
// this code can produce. I'm trying to turn my "feels" in the gym into a
// mathematical formula.

// My testing approach was to first ensure that the
// increment value is being calculated correctly. Exposing this kinda
// breaks the encapsulation of this code, but I was using TDD to develop
// it. Once I had my increments, I set up an algorithm to determine the
// weight calculation. This is where is gets tricky. I made a series of
// tests, each isolating for a specific factor. I then ran it against
// test data from training. From that test data I was able to tune specific
// parts of the calculation.

// Problems with this approach:
// It's hard to test individual parts
// The tests are pretty brittle. One change to a calculation can break many tests.
// However, this does encourage me to only tune the part of the calculation being
// tested. Perhaps I could have used a range for my test values.

import {
  WeightCalculationActivity,
  CalculateIncrementValue,
} from './WeightCalculationActivity';

describe('WeightCalculationActivity', () => {
  // logic without exponential growth of increment values:
  // 450 should be around 3.75 pound increments
  // 300 should be 2.5 pound increments,
  // 150 should be 1.5

  it('calculates weight 200 correctly', () => {
    let calculation = CalculateIncrementValue(200);
    let roundedValue = Math.round(calculation * 10) / 10;

    expect(roundedValue).toBe(1.7);
  });

  it('calculates weight 300 correctly', () => {
    expect(CalculateIncrementValue(300)).toBeGreaterThan(2.5);
  });

  it('calculates weight 450 correctly', () => {
    // This old_increment_increase ensure that the increment value is growing
    let old_increment_increase = CalculateIncrementValue(300) - 2.5;
    expect(CalculateIncrementValue(450)).toBeGreaterThan(
      3.75 + old_increment_increase
    );
  });

  it('calculates weight 150 correctly', () => {
    expect(CalculateIncrementValue(150)).toBeLessThan(1.25);
  });

  it('calculates less than 80', () => {
    let old_increment_decrease = CalculateIncrementValue(150) - 1.25;
    expect(CalculateIncrementValue(80)).toBeLessThan(1 + old_increment_decrease);
  });
});

describe('WeightCalculationActivity', () => {
  describe('Single factor tests', () => {
    describe('Static RPE, average weight', () => {
      it('returns the start weight with low rpe, medium reps', () => {
        let weightRanges = [100, 200, 300, 400, 500];

        weightRanges.forEach((weight) => {
          let calculated = WeightCalculationActivity(5, weight, 7, 7);
          expect(calculated).toBe(weight);
        });
      });
    });

    describe('Different reps', () => {
      it('increases drop for high reps', () => {
        let weightRanges = [
          { weight: 100, correct: 95 },
          { weight: 200, correct: 190 },
          { weight: 300, correct: 285 },
          { weight: 400, correct: 375 },
          { weight: 500, correct: 470 },
        ];

        weightRanges.forEach((pair) => {
          let calculated = WeightCalculationActivity(8, pair.weight, 8, 8);
          expect(calculated).toBe(pair.correct);
        });
      });

      it('decreases drops for low reps', () => {
        let weightRanges = [
          { weight: 100, correct: 95 },
          { weight: 200, correct: 195 },
          { weight: 300, correct: 295 },
          { weight: 400, correct: 395 },
          { weight: 500, correct: 495 },
        ];

        weightRanges.forEach((pair) => {
          let calculated = WeightCalculationActivity(3, pair.weight, 8, 8);
          expect(calculated).toBe(pair.correct);
        });
      });

      describe('Different rpe', () => {
        it('reduces weight for a lower rpe', () => {
          let weightRanges = [
            { weight: 100, correct: 95 },
            { weight: 200, correct: 190 },
            { weight: 300, correct: 285 },
            { weight: 400, correct: 375 },
            { weight: 500, correct: 470 },
          ];

          weightRanges.forEach((pair) => {
            let calculated = WeightCalculationActivity(5, pair.weight, 8, 7);
            expect(calculated).toBe(pair.correct);
          });
        });

        it('increases weight for a higher rpe', () => {
          let weightRanges = [
            { weight: 100, correct: 105 },
            { weight: 200, correct: 210 },
            { weight: 300, correct: 320 },
            { weight: 400, correct: 430 },
            { weight: 500, correct: 545 },
          ];

          weightRanges.forEach((pair) => {
            let calculated = WeightCalculationActivity(5, pair.weight, 7, 9);
            expect(calculated).toBe(pair.correct);
          });
        });
      });

      describe('High RPE', () => {
        it('increases drop for 9', () => {
          let weightRanges = [
            { weight: 100, correct: 95 },
            { weight: 200, correct: 195 },
            { weight: 300, correct: 290 },
            { weight: 400, correct: 385 },
            { weight: 500, correct: 480 },
          ];

          weightRanges.forEach((pair) => {
            let calculated = WeightCalculationActivity(5, pair.weight, 9, 9);
            expect(calculated).toBe(pair.correct);
          });
        });

        it('increases drop even more for 10', () => {
          let weightRanges = [
            { weight: 100, correct: 95 },
            { weight: 200, correct: 190 },
            { weight: 300, correct: 285 },
            { weight: 400, correct: 375 },
            { weight: 500, correct: 470 },
          ];

          weightRanges.forEach((pair) => {
            let calculated = WeightCalculationActivity(5, pair.weight, 10, 10);
            expect(calculated).toBe(pair.correct);
          });
        });
      });
    });

    describe('Multi factory tests', () => {
      describe('High RPE + lower target', () => {
        it('increases drop for 9', () => {
          let weightRanges = [
            { weight: 100, correct: 90 },
            { weight: 200, correct: 175 },
            { weight: 300, correct: 260 },
            { weight: 400, correct: 340 },
            { weight: 500, correct: 420 },
          ];

          weightRanges.forEach((pair) => {
            let calculated = WeightCalculationActivity(5, pair.weight, 10, 8);
            expect(calculated).toBe(pair.correct);
          });
        });
      });
    });
  });
});

//TODO test it increasing weight
