import store from "../../store/configureStore";
import { assetHistoryAdded } from "../../store/assetHistory";
import { accountAdded, accountEdited, accountDeleted } from "../../store/account";

export function generateUniqueID() {
    let newId = 0;
    let i = 0;
    for (i = 0; i < 999999; i++) {
      // Check if there is an element with id equal to i in the current state
      const index = store.getState().accounts.findIndex(function (element) {
        return element.id === i;
      });
      // If no element has id equal to i, use i as the new id
      if (index === -1) {
        newId = i;
        break;
      }
    }
    //console.log(newId)
    return newId;
}


export function getLatestAsset(){
    // 將資料以 id 為鍵進行分組，取每個 id 最新的一筆資料
    const latestDataById = store.getState().assetHistory.reduce((result, item) => {
        if (!result[item.id] || new Date(item.timeStamp) > new Date(result[item.id].timeStamp) ) 
            {
            result[item.id] = item;
            }
            return result;
        }, {});
        const latestData = Object.values(latestDataById);
        return latestData;
}

export function getAccountById(id){
    return store.getState().accounts.filter(item => item.id === id)[0];
}


// 創建一個事件委派（事件管理器）
class EventDelegate {
    constructor() {
      this.handlers = [];
    }
  
    // 添加事件處理函數
    addHandler(handler) {
      this.handlers.push(handler);
    }
  
    // 觸發事件
    invoke(...args) {
      this.handlers.forEach((handler) => handler(...args));
    }
}


//=========================================ADD=========================================
//創建一個事件委派實例
const addEvent = new EventDelegate();

//定義一個事件處理函數
function Handler_Add1(args1, args2, args3, args4, args5, args6) {
    if(args5 === null || args5 === undefined){
        store.dispatch(accountAdded({id: args1, name: args2, value: args3, type: args4}))
    }
    // else if(args6 === null || args6 === undefined){
    //     store.dispatch(accountAdded({id: args1, name: args2, amount: args3, unitValue: args4, type: args5}))
    // }
    else{
        store.dispatch(accountAdded({id: args1, name: args2, value:args3, type: args4, amount: args5, unitValue: args6, }))
    }
}

//記錄資產歷史
function Handler_Add2(args1, args2, args3, args4, args5, args6) {
    store.dispatch(assetHistoryAdded({id: args1, value: args3}))
}

//將事件處理函數添加到事件委派中(綁定兩個Handler到一個Event)
addEvent.addHandler(Handler_Add1);
addEvent.addHandler(Handler_Add2);


export function AddAccount(args1, args2, args3, args4, args5, args6){
    addEvent.invoke(args1, args2, args3, args4, args5, args6)
}


//=========================================DELETE=========================================
const deleteEvent = new EventDelegate();

function Handler_Delete1(args1) {
    store.dispatch(accountDeleted({id: args1}));
}

function Handler_Delete2(args1) {
    store.dispatch(assetHistoryAdded({id: args1, value: 0}));
}

deleteEvent.addHandler(Handler_Delete1);
deleteEvent.addHandler(Handler_Delete2);

export function DeleteAccount(args1){
    deleteEvent.invoke(args1)
}






//=========================================EDIT=========================================
const editEvent = new EventDelegate();

function Handler_Edit1(args1, args2, args3, args4, args5, args6) {
    if(args5 === null || args5 === undefined){
        store.dispatch(accountEdited({id: args1, name: args2, value: args3, type: args4}));
    }
    else{
        store.dispatch(accountEdited({id: args1, name: args2, value: args3, type: args4, amount: args5, unitValue: args6}));
    }
    
}

function Handler_Edit2(args1, args2, args3, args4, args5, args6) {
    store.dispatch(assetHistoryAdded({id: args1, value: args3}));//紀錄資產歷史
}

editEvent.addHandler(Handler_Edit1);
editEvent.addHandler(Handler_Edit2);


export function EditAccount(args1, args2, args3, args4, args5, args6){
    editEvent.invoke(args1, args2, args3, args4, args5, args6)
}