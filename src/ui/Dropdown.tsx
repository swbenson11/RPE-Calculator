import * as React from 'react';
interface Props {
  selectedValue?: any;
  values: Array<{ label: string; value: any }>;
  onChange: Function;
}

export const Dropdown = (props: Props) => {
  let { selectedValue, values, onChange } = props;
  return (
    <select
      name="select"
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(parseInt(event.target.value));
      }}>
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
