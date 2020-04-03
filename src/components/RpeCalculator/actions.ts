//action types
export const UPDATE_REPS = 'UPDATE_REPS';
export const UPDATE_RPE = 'UPDATE_RPE';
export const UPDATE_WEIGHT = 'UPDATE_WEIGHT';

// const boundAddTodo = text => dispatch(addTodo(text))
//Actions with dispatch included
export const updateReps = (value: number) => ({
  type: UPDATE_REPS,
  value
});

export const updateRPE = (value: number) => ({
  type: UPDATE_RPE,
  value
});

export const updateWeight = (value: number) => ({
  type: UPDATE_WEIGHT,
  value
});
