import { combineReducers } from 'redux';
import RPECalculatorReducer from './components/RPECalculator/reducer';

export default combineReducers({
  RPECalculator: RPECalculatorReducer,
});
