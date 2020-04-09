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

  styleForecast = (weights: Array<number>) => {
    return weights.map((weight: number, index: number) => (
      <p>
        Set {index + 2}: {weight} lbs
      </p>
    ));
  };

  render() {
    const { reps, RPE, targetRPE, weight } = this.props;
    let weightForecast = CalculateEntireWorkout(reps, weight, RPE, targetRPE, 5);
    let nextWeight = weightForecast.splice(0, 1);

    return (
      <div className={'calculatorOutputs'}>
        <h3>Results</h3>
        <div className={'paddingLeft'}>
          <p className={'largeText'}>
            Next Set: {reps} x <span className="strongText">{nextWeight}</span> lbs @
            {targetRPE}
          </p>
          <p>
            <p className={'largeText '}>
              <span className={'underline mediumText'}>
                Weight Forecast to maintain a RPE {targetRPE}
              </span>
              <br />
              <div className={''}>{this.styleForecast(weightForecast)}</div>
            </p>
          </p>
        </div>
      </div>
    );
  }
}
export default CalculatorInputs;
