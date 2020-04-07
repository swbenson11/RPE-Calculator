export const EnsureIsNumber = (value: number | string) => {
  if (typeof value === 'string') {
    value = value.replace(/\D/g, '');
    if (value === '') return 0;
  } else if (value === undefined || isNaN(value)) {
    return 0;
  }
  return value;
};
