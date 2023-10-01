import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'assetHistory',
    initialState: [],
    reducers:{
        assetHistoryAdded:(state, action) =>{
            var date = new Date();
            var datestr = date.getFullYear()+ '/' + (date.getMonth()+1) + '/' + date.getDate();
            state.push({
                id: action.payload.id,
                timeStamp: datestr + '-' + date.toTimeString(),
                value: action.payload.value
            })
            //console.log(timestr);
            // console.log(action.payload.id)
            // console.log(action.payload.value)
            // console.log(state)
        }
    }
})

//不論add edit delete 一律用assetHistoryAdded，用id辨別帳戶，用date time來過濾要找某個日期之前的資料(找某個日期前最新的一筆)，若是刪除則將金額改為0

const assetHistoryReducer = slice.reducer;


export const { assetHistoryAdded } = slice.actions;

export default assetHistoryReducer;
