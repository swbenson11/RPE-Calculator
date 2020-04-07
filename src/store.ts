import { createStore } from 'redux';
import reducers from './reducers';

export interface State {
  RPECalculator: {
    reps: number;
    RPE: number;
    targetRPE: number;
    weight: number;
  };
}

const initialState = {
  RPECalculator: {
    reps: 5,
    RPE: 8,
    targetRPE: 8.5,
    weight: 250,
  },
};

const appStore = createStore(reducers, initialState);
export default appStore;
