import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: 'account',
  initialState: [],
  reducers:{
      accountAdded:(state, action) =>{
        //如果有mutate state，就不用return
        state.push({
            id: action.payload.id, 
            name: action.payload.name, 
            type: action.payload.type,
          });
      },
      accountDeleted: (state, action) =>{
        //沒有mutate state，要加return
        return state.filter(item => item.id!==action.payload.id);
      },
      accountEdited: (state, action) =>{
        return state.map(item => item.id === action.payload.id ? 
          {...item, 
            name: action.payload.name, 
            type: action.payload.type,
          } :item);
      },
  }
})

const accountReducer = slice.reducer;


export const { accountAdded, accountDeleted,  accountEdited} = slice.actions;

export default accountReducer;