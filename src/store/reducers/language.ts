import {Action} from "redux";
import {UPDATELANGUAGE} from "../actions";

const initState: string = 'zh';
const language = (state = initState, action: Action & { payload: string }) => {
    switch (action.type) {
        case UPDATELANGUAGE:
            return action.payload;
        default:
            return state
    }
};

export default language;