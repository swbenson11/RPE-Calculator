import React = require('react');
import { connect, ConnectedProps } from 'react-redux';

import { Dropdown } from '../../ui/Dropdown';
import { updateReps, updateRPE } from './actions';

//where does this go?
// interface State {
//   reps?: number;
//   rpe?: number;
//   weight?: number;
// }

const mapState = (state: any) => ({
  reps: state.rpeCalculator.reps,
  rpe: state.rpeCalculator.rpe,
  weight: state.rpeCalculator.weight
});

const mapDispatch = (dispatch: any) => {
  return {
    updateRPE: (value: number) => dispatch(updateRPE(value)),
    updateReps: (value: number) => dispatch(updateReps(value))
  };
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;
//  & {
//   backgroundColor: string
// }

class RpeCalculator extends React.PureComponent<Props> {
  //todo fix this
  dropdownValues = [1, 2, 3].map(x => {
    return {
      label: x.toString(),
      value: x
    };
  });

  render() {
    const { reps, rpe, weight, updateReps, updateRPE } = this.props;
    return (
      <div>
        <h1>Rep Calculator</h1>
        <Dropdown
          selectedValue={1}
          values={this.dropdownValues}
          onChange={(value: any) => {
            updateRPE(value);
          }}
        />
        <h2>RPE: {rpe}</h2>
        <h2>Reps: {reps}</h2>
      </div>
    );
  }
}
export default connector(RpeCalculator);
