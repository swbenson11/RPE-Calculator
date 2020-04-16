import React = require('react');
import { NumberInput } from '../../../ui/NumberInput';
import { StyledDropdown } from '../../../ui/StyledDropdown';

import './CalculatorInputs.scss';

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

  WrappedNumberInput = (label: string, value: number, updateFunction: Function) => (
    <div className={'calculator-input'}>
      <label>{label}</label>
      <NumberInput
        className={'calculator-input-item'}
        value={value}
        onChange={(value: number) => {
          updateFunction(value);
        }}
      />
    </div>
  );

  WrappedDropdown = (label: string, value: number, updateFunction: Function) => (
    <div className={'calculator-input'}>
      <label>{label}</label>
      <StyledDropdown
        wrappingClass={'calculator-input-item'}
        selectedValue={value}
        values={this.dropdownValues}
        onChange={(value: string) => {
          updateFunction(value);
        }}
      />
    </div>
  );

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
      <div className={'padding-left'}>
        {this.WrappedNumberInput('Reps:', reps, updateReps)}
        {this.WrappedNumberInput('Weight:', weight, updateWeight)}
        <br />
        {this.WrappedDropdown('RPE:', RPE, updateRPE)}
        {this.WrappedDropdown('Next Target RPE:', targetRPE, updateTargetRPE)}
      </div>
    );
  }
}
export default CalculatorInputs;
