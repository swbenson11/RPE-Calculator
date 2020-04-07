import React = require('react');
import { NumberInput } from '../../../ui/NumberInput';
import { StyledDropdown } from '../../../ui/StyledDropdown';

import './CalculatorInputs.css';

type Props = {
  RPE: number;
  reps: number;
  targetRPE: number;
  weight: number;
  updateRPE: Function;
  updateTargetRPE: Function;
  updateReps: Function;
  updateWeight: Function;
};

class CalculatorInputs extends React.PureComponent<Props> {
  dropdownValues = [7, 7.5, 8, 8.5, 9, 9.5, 10].map((x) => {
    return {
      text: x.toString(),
      value: x,
    };
  });

  render() {
    const {
      reps,
      RPE,
      targetRPE,
      weight,
      updateReps,
      updateRPE,
      updateTargetRPE,
      updateWeight,
    } = this.props;
    return (
      <div className={'calculatorInputs'}>
        <div className={'calculatorInput'}>
          <label>Reps:</label>

          <NumberInput
            className={'calculatorInputItem'}
            value={reps}
            onChange={(value: number) => {
              updateReps(value);
            }}
          />
        </div>

        <div className={'calculatorInput'}>
          <label>Weight:</label>

          <NumberInput
            className={'calculatorInputItem'}
            value={weight}
            onChange={(value: number) => {
              updateWeight(value);
            }}
          />
        </div>

        <div className={'calculatorInput'}>
          <label>RPE:</label>

          <StyledDropdown
            wrappingClass={'calculatorInputItem'}
            selectedValue={RPE}
            values={this.dropdownValues}
            onChange={(value: string) => {
              updateRPE(value);
            }}
          />
        </div>

        <div className={'calculatorInput'}>
          <label>Next Target RPE:</label>

          <StyledDropdown
            wrappingClass={'calculatorInputItem'}
            selectedValue={targetRPE}
            values={this.dropdownValues}
            onChange={(value: string) => {
              updateTargetRPE(value);
            }}
          />
        </div>
      </div>
    );
  }
}
export default CalculatorInputs;
