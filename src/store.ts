import { createStore } from 'redux';
import reducers from './reducers';

///TODO remove
// //todo move to state
// export interface state {
//   rpeCalculator: {
//     reps?: number,
//     rpe?: number,
//     weight?: number
//   };
// }

const initialState = {
  rpeCalculator: {
    reps: 5,
    rpe: 8,
    weight: 250
  }
};

const appStore = createStore(reducers, initialState);
export default appStore;
