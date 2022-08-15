import { combineReducers } from "redux";

import classReducer from "./class";
import studentReducer from "./student";
import subjectReducer from "./subject";

const rootReducer = combineReducers({
  Class: classReducer,
  Student: studentReducer,
  Subject: subjectReducer,
});

export default rootReducer;
