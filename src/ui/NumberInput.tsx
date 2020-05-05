import * as React from 'react';
import { InputProps } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import { EnsureIsNumber } from '../helpers/numberHelpers';

interface Props {
  value: number | string;
  onChange: Function;
  className?: string;
}

export const NumberInput = React.memo((props: Props) => {
  const { value, onChange, className } = props;
  // This is a tad over engineered for it's use, but I want this to
  // be reuseable and I'm trying to display
  // how I would do in a professional environment
  const vettedValue = EnsureIsNumber(value);

  return (
    <Input
      className={className}
      value={vettedValue}
      type={'number'}
      onChange={(
        event: React.SyntheticEvent<HTMLElement, Event>,
        data: InputProps
      ) => {
        let value = data.value.replace(/\D/g, '');
        if (value === '') value = 0;
        onChange(parseInt(value));
      }}
    />
  );
});
