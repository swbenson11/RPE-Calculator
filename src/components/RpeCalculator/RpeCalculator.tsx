import { State } from '../../store';
import React = require('react');
import { ConnectedProps, connect } from 'react-redux';

import { updateReps, updateRPE, updateWeight, updateTargetRPE } from './actions';
import CalculatorInputs from './CalculatorInputs';
import WeightCalculationActivity from '../../activity/WeightCalculationActivity';

const mapState = (state: State) => ({
  reps: state.RPECalculator.reps,
  RPE: state.RPECalculator.RPE,
  targetRPE: state.RPECalculator.targetRPE,
  weight: state.RPECalculator.weight,
});

const mapDispatch = (dispatch: any) => {
  return {
    updateRPE: (value: number) => dispatch(updateRPE(value)),
    updateTargetRPE: (value: number) => dispatch(updateTargetRPE(value)),
    updateReps: (value: number) => dispatch(updateReps(value)),
    updateWeight: (value: number) => dispatch(updateWeight(value)),
  };
};
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class RPECalculator extends React.PureComponent<Props> {
  render() {
    const {
      reps,
      RPE,
      targetRPE,
      weight,
      updateRPE,
      updateTargetRPE,
      updateReps,
      updateWeight,
    } = this.props;

    return (
      <div>
        <h1>Rep Calculator</h1>

        <CalculatorInputs
          reps={reps}
          RPE={RPE}
          targetRPE={targetRPE}
          weight={weight}
          updateRPE={updateRPE}
          updateTargetRPE={updateTargetRPE}
          updateReps={updateReps}
          updateWeight={updateWeight}
        />

        <h2>RPE: {RPE}</h2>
        <h2>Target RPE: {targetRPE}</h2>
        <h2>Reps: {reps}</h2>
        <h2>Weight: {weight}</h2>

        <h2>Next Set: {WeightCalculationActivity(reps, weight, RPE, targetRPE)}</h2>
      </div>
    );
  }
}
export default connector(RPECalculator);
