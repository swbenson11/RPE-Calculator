import * as React from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';

interface Props {
  selectedValue?: any;
  values: Array<{
    value: any;
    text: string;
  }>;
  onChange: Function;
  wrappingClass?: string;
}

export const StyledDropdown = React.memo((props: Props) => {
  let { selectedValue, values, onChange, wrappingClass } = props;

  return (
    <div className={wrappingClass}>
      <Dropdown
        selection
        fluid
        options={values}
        value={selectedValue}
        onChange={(
          event: React.SyntheticEvent<HTMLElement, Event>,
          data: DropdownProps
        ) => {
          onChange(data.value);
        }}
      />
    </div>
  );
});
