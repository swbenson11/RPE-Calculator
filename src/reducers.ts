import { combineReducers } from 'redux';
import rpeCalculatorReducer from './components/RpeCalculator/reducer';

export default combineReducers({
  rpeCalculator: rpeCalculatorReducer
});
