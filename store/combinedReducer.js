import { combineReducers } from "redux";
import accountReducer from "./account";
import incomeReducer from "./incomes"
import assetHistoryReducer from "./assetHistory";


//資產Tab，收支表Tab，歷史紀錄 合併成一個Reducer, accounts，incomes和assetHistory為三個substate
export default combineReducers({
    assetHistory: assetHistoryReducer,
    accounts: accountReducer,
    incomes: incomeReducer,
})