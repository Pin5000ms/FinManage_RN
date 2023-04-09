import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

let lastIdp = 0;
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

export default combineReducers({
    posIncomes: slice_p.reducer,
    negIncomes: slice_n.reducer,
})

export const { posIncomeAdded, posIncomeDeleted } = slice_p.actions;
export const { negIncomeAdded, negIncomeDeleted } = slice_n.actions;


