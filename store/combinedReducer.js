import { combineReducers } from "redux";
import accountReducer from "./account";
import incomeReducer from "./incomes"
import accountHistoryReducer from "./accountHistory";


//資產Tab，收支表Tab，歷史紀錄 合併成一個Reducer, accounts，incomes和assetHistory為三個substate
export default combineReducers({
    accountHistory: accountHistoryReducer,
    accounts: accountReducer,
    incomes: incomeReducer,
})