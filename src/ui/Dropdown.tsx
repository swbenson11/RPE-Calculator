import * as React from 'react';
interface Props {
  selectedValue?: any;
  values: Array<{ label: string; value: any }>;
  onChange: () => void;
}

export const Dropdown = (props: Props) => {
  let { selectedValue, values, onChange } = props;
  return (
    <select name="select" onChange={onChange}>
      {values.map(dropdownValue => {
        return (
          <option
            value={dropdownValue.value}
            selected={dropdownValue.value === selectedValue}>
            {dropdownValue.label}
          </option>
        );
      })}
    </select>
  );
};
