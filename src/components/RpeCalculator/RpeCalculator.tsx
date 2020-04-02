import { Dropdown } from '../../ui/Dropdown';
import React = require('react');

export default class RpeCalculator extends React.Component {
  dropdownValues = [1, 2, 3].map(x => {
    return {
      label: x.toString(),
      value: x
    };
  });

  render() {
    return (
      <div>
        <h1>Rep Calculator</h1>
        <Dropdown
          selectedValue={1}
          values={this.dropdownValues}
          onChange={() => {
            console.log('test');
          }}
        />
      </div>
    );
  }
}
