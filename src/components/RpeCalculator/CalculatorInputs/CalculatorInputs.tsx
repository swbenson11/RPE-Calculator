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

  WrappedNumberInput = (label: string, value: number, updateFunction: Function) => (
    <div className={'calculatorInput'}>
      <label>{label}</label>
      <NumberInput
        className={'calculatorInputItem'}
        value={value}
        onChange={(value: number) => {
          updateFunction(value);
        }}
      />
    </div>
  );

  WrappedDropdown = (label: string, value: number, updateFunction: Function) => (
    <div className={'calculatorInput'}>
      <label>{label}</label>
      <StyledDropdown
        wrappingClass={'calculatorInputItem'}
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
      <div className={'paddingLeft'}>
        {this.WrappedNumberInput('Reps:', reps, updateReps)}

        {this.WrappedNumberInput('Weight:', weight, updateWeight)}

        {this.WrappedDropdown('RPE:', RPE, updateRPE)}

        {this.WrappedDropdown('Next Target RPE:', targetRPE, updateTargetRPE)}
      </div>
    );
  }
}
export default CalculatorInputs;
