import {combineReducers} from "redux";

import language from "./language";
import userInfo from "./user-info";

const Reducer = combineReducers({
    language,
    userInfo
});

export default Reducer;