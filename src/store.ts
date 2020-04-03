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
    reps: 7,
    rpe: 7,
    weight: 7
  }
};

const appStore = createStore(reducers, initialState);
export default appStore;
