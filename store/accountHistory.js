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
        }
    }
})

const accountHistoryReducer = slice.reducer;


export const { accountHistoryAdded, accountHistoryDeleted, accountHistoryDeleted_whole } = slice.actions;

export default accountHistoryReducer;
