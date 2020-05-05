import { State } from '../../store';
import React = require('react');
import { ConnectedProps, connect } from 'react-redux';

import { updateReps, updateRPE, updateWeight, updateTargetRPE } from './actions';
import CalculatorInputs from './CalculatorInputs';
import CalculatorOutputs from './CalculatorOutputs';

import './RpeCalculator.scss';

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
      <div className="rpe-calculator">
        <div className="grid-item">
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
        </div>
        <div className="grid-item">
          <CalculatorOutputs
            reps={reps}
            RPE={RPE}
            targetRPE={targetRPE}
            weight={weight}
          />
        </div>
      </div>
    );
  }
}
export default connector(RPECalculator);
