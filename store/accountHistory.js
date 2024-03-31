import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'accountHistory',
    initialState: [],
    reducers:{
        accountHistoryAdded:(state, action) =>{
            state.push(action.payload)
        },
        accountHistoryDeleted:(state, action) =>{
            return state.filter(item => item.itemId!==action.payload.itemId);
        },
        accountHistoryDeleted_whole:(state, action) =>{
            return state.filter(item => item.accountId!==action.payload.accountId);
        },
        accountHistoryEdited:(state, action) =>{
            return state.map(item => (item.accountId === action.payload.accountId && item.itemId === action.payload.itemId)  ? 
              {...item, 
                itemName: action.payload.itemName,
                itemVal: action.payload.itemVal,
                unitVal: action.payload.unitVal,
                amount: action.payload.amount,
                timeStamp: action.payload.timeStamp
              } :item);
        },
    }
})

const accountHistoryReducer = slice.reducer;


export const { accountHistoryAdded, accountHistoryDeleted, accountHistoryDeleted_whole, accountHistoryEdited } = slice.actions;

export default accountHistoryReducer;
