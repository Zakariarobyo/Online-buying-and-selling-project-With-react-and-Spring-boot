import { createStore, combineReducers } from "redux";
import userReducer from "./user/user";


const reducers = combineReducers({ userReducer });


const store = createStore(reducers);

export default store;