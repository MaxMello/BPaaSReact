import { combineReducers } from "redux";

import useProcesses from './useProcessesReducer'
import user from './userReducer'

export default combineReducers({
  useProcesses, user
});
