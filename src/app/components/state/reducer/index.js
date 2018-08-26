import { combineReducers } from "redux";
import randomReducer from "./randomReducer";
import userProfileReducer from "./userProfileReducer";

export default combineReducers({
    randomReducer,
    userProfileReducer,    
});