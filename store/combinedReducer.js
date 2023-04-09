import { combineReducers } from "redux";
import accountReducer from "./account";
import incomeReducer from "./incomes"

export default combineReducers({
    accounts: accountReducer,
    incomes: incomeReducer,
})