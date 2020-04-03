import React = require('react');
import { connect, ConnectedProps } from 'react-redux';

import { Dropdown } from '../../ui/Dropdown';
import { updateReps, updateRPE, updateWeight } from './actions';

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
    updateReps: (value: number) => dispatch(updateReps(value)),
    updateWeight: (value: number) => dispatch(updateWeight(value))
  };
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;
//  & {
//   backgroundColor: string
// }

class RpeCalculator extends React.PureComponent<Props> {
  dropdownValues = [7, 7.5, 8, 8.5, 9, 9.5, 10].map(x => {
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

        <label>
          Reps:
          <input
            type="text"
            value={reps}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              var reps = parseInt(event.target.value);
              if (reps > 6) alert('why are you doing so many reps');
              updateReps(reps);
            }}
          />
        </label>

        <label>
          Weight:
          <input
            type="text"
            value={weight}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              updateWeight(parseInt(event.target.value));
            }}
          />
        </label>

        <Dropdown
          selectedValue={rpe}
          values={this.dropdownValues}
          onChange={(value: any) => {
            updateRPE(value);
          }}
        />
        <h2>RPE: {rpe}</h2>
        <h2>Reps: {reps}</h2>
        <h2>Weight: {weight}</h2>
      </div>
    );
  }
}
export default connector(RpeCalculator);
