import { createAction, createReducer } from "@reduxjs/toolkit";

// const ADD = "add";
// const DELETE = "delete";
// const EDIT = "edit";
export const accountAdded = createAction("add"); //"add"為accountAdded的type
export const accountDeleted = createAction("delete")
export const accountEdited = createAction("edit")

//https://redux-toolkit.js.org/api/createReducer

const accountReducer = createReducer([], (builder) => {
    builder
      .addCase(accountAdded, (state, action) => {
        let newKey = 0;
        for(i = 0; i < 999999; i++)
        {
            const index = state.findIndex(function(element) {
                return element.key == i
            });
            if(index == -1){
                newKey = i;
                break;
            }
        }

        //如果value沒有定義 改用amount*unitValue取代
        let tmpVal = 0;
        if(action.payload.value === undefined){
          tmpVal = action.payload.amount*action.payload.unitValue;
        }
        else{
          tmpVal = action.payload.value;
        }

        //如果有mutate state，就不用return
        state.push({
            key: newKey, 
            name: action.payload.name, 
            value: tmpVal,
            type: action.payload.type,
            amount : action.payload.amount,
            unitValue: action.payload.unitValue
          });
      })

      .addCase(accountDeleted, (state, action) => {
        //沒有mutate state，要加return
        return state.filter(item => item.key!==action.payload.key);
      })

      .addCase(accountEdited, (state, action) => {
        return state.map(item => item.key===action.payload.key ? 
            {...item, 
              name: action.payload.name, 
              value: action.payload.value, 
              type: action.payload.type,
              amount : action.payload.amount,
              unitValue: action.payload.unitValue
            } :item);
      })

}

)
export default accountReducer;

// export default function reducer(state = []/*預設為空*/, action){
//     switch(action.type){

//         case accountAdded.type:
//             let newKey = 0;
//             for(i = 0; i < 999999; i++)
//             {
//                 const index = state.findIndex(function(element) {
//                     return element.key == i
//                 });
//                 if(index == -1){
//                     newKey = i;
//                     break;
//                 }
//             }
//             return [...state,
//                     {
//                         key: newKey, 
//                         name: action.payload.name, 
//                         value: action.payload.value,
//                         type: action.payload.type}]     

//         case accountDeleted.type:
//             return state.filter(item => item.key!==action.payload.key);


//         case accountEdited.type:
            
//             return state.map(item => item.key===action.payload.key ? 
//                 {...item, name: action.payload.name, value: action.payload.value, type: action.payload.type} :
//                  item);

//         default:
//             return state;
//     }
// }





// export function accountAdded(inputText, inputNumber, inputType){
//     return {
//         type: ADD,
//         payload: {
//             name: inputText,
//             value: inputNumber,
//             type: inputType
//           }
//     }

// }

// export function accountDeleted(inputKey){
//     return {
//         type: DELETE,
//         payload: {
//             key: inputKey
//           }
//     }

// }

// export function accountEdited(inputKey, inputText, inputNumber, inputType){
//     return {
//         type: EDIT,
//         payload: {
//             key: inputKey,
//             name: inputText,
//             value: inputNumber,
//             type: inputType
//           }
//     }

// }