import { combineReducers } from "redux";
import accountReducer from "./account";
import incomeReducer from "./incomes"


//資產Tab和收支表Tab合併成一個Reducer, accounts和incomes為兩個substate
export default combineReducers({
    accounts: accountReducer,
    incomes: incomeReducer,
})