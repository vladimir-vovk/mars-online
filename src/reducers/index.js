import { combineReducers } from 'redux';
import MissionsReducer from './MissionsReducer';

export default combineReducers({
  missions: MissionsReducer,
});
