import { combineReducers } from "redux";

import user from "./userReducer";
import loading from "./loadingReducer";
import datas from "./datasReducer";
import admins from "./adminReducer";

const rootReducer = combineReducers({ user, loading, datas, admins });

export default rootReducer;