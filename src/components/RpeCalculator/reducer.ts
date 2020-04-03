import { UPDATE_REPS, UPDATE_RPE, UPDATE_WEIGHT } from './actions';

// TODO Figure out how to type action in TypeScript
// could it be just action: String, value:any?
export default function rpeCalculatorReducer(state = {}, action: any) {
  switch (action.type) {
    case UPDATE_REPS:
      return Object.assign({}, state, {
        reps: action.value
      });
    case UPDATE_RPE:
      return Object.assign({}, state, {
        rpe: action.value
      });
    case UPDATE_WEIGHT:
      return Object.assign({}, state, {
        weight: action.value
      });
    default:
      return state;
  }
}
