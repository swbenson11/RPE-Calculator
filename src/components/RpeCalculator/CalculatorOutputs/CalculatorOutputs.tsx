import React = require('react');
import { CalculateEntireWorkout } from '../../../activity/CalculateEntireWorkoutActivity';

import './CalculatorOutputs.scss';

type Props = {
  RPE: number;
  reps: number;
  targetRPE: number;
  weight: number;
};

class CalculatorInputs extends React.PureComponent<Props> {
  dropdownValues = [7, 7.5, 8, 8.5, 9, 9.5, 10].map((x) => {
    return {
      text: x.toString(),
      value: x,
    };
  });

  styledForecast = (weights: Array<number>) => {
    return weights.map((weight: number, index: number) => (
      <p>
        Set {index + 2}: {weight} lbs
      </p>
    ));
  };

  render() {
    const { reps, RPE, targetRPE, weight } = this.props;
    const weightForecast = CalculateEntireWorkout(reps, weight, RPE, targetRPE, 5);
    const totalVolume = weightForecast.reduce((acc: number, val: number) => {
      return acc + val * reps;
    }, 0);

    // I'm avoiding splice on weight forecast directly to avoid side effects, like creating
    // temporal dependencies for when totalVolume is calculated.
    const predictedSets = [...weightForecast].splice(1, weightForecast.length - 1);
    return (
      <div className={'calculatorOutputs large-text'}>
        <div>
          <h1>
            Next Set: {reps} x {weightForecast[0]}lbs @{targetRPE}
          </h1>
        </div>

        <div className="weight-forecast">
          <div className="weight-forecast-grid-container">
            <div className="weight-forecast-grid-item text-align-left">
              <h2>Project weight selection to maintain a RPE {targetRPE}</h2>

              <p>
                Please note, this is a projection to help you predict your workout.
                Your RPE will vary in application.
              </p>
            </div>
            <div className="weight-forecast-grid-item text-align-right">
              <div>{this.styledForecast(predictedSets)}</div>
            </div>
          </div>
        </div>
        <h2>Total Projected Volume: {totalVolume}</h2>
      </div>
    );
  }
}
export default CalculatorInputs;
