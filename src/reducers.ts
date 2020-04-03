import { combineReducers } from 'redux';
import rpeCalculatorReducer from './components/RpeCalculator/reducer';

export default combineReducers({
  rpeCalculator: rpeCalculatorReducer
});

//This is equivalent to
// export default function appReducer(state: state = initialState, action: any) {
//     return {
//       rpeCalculator: rpeCalculatorReducer(state.rpeCalculator, action)
//     }
//   }
