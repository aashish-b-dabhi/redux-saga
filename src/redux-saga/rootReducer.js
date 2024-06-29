import { combineReducers } from "redux";
import adminReducer from "./admin/reducer";

const rootReducer = combineReducers({
    adminReducer,
})

export default rootReducer