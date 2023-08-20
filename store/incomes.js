import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

let lastIdp = 0;
//createSlice => 結合createAction和createReducer
const slice_p = createSlice({
    name: 'posIncome',
    initialState: [],
    reducers:{
        posIncomeAdded:(incomes, action) =>{
            incomes.push({id: ++lastIdp, name: action.payload.name, value: action.payload.value})
        },
        posIncomeDeleted:(incomes, action) =>{
            //沒有mutate state，要加return
            return incomes.filter(item => item.id!==action.payload.id);
        }
    }
})

let lastIdn = 0;
const slice_n = createSlice({
    name: 'negIncome',
    initialState: [],
    reducers:{
        negIncomeAdded:(incomes, action) =>{
            incomes.push({id: ++lastIdn, name: action.payload.name, value: action.payload.value})
        },
        negIncomeDeleted:(incomes, action) =>{
            //沒有mutate state，要加return
            return incomes.filter(item => item.id!==action.payload.id);
        }
    }
})

//收入和支出的合併成一個Reducer
export default combineReducers({
    posIncomes: slice_p.reducer,
    negIncomes: slice_n.reducer,
})

export const { posIncomeAdded, posIncomeDeleted } = slice_p.actions;
export const { negIncomeAdded, negIncomeDeleted } = slice_n.actions;


