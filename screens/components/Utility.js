import store from "../../store/configureStore";
import { accountHistoryAdded, accountHistoryDeleted_whole } from "../../store/accountHistory";
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

export function generateUniqueItemId(accountId) {
    let newId = 0;
    let i = 0;
    for (i = 0; i < 999999; i++) {
      const accountData = store.getState().accountHistory.filter(item => item.accountId === accountId )
      // Check if there is an element with id equal to i in the current state
      const index = accountData.findIndex(function (element) {
        return element.itemId === i;
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

export function getAccountHistoryByAccountId(accountId){
    return store.getState().accountHistory.filter(item => item.accountId === accountId )
}


export function getAccountSumByAccountId(accountId){
    const accountData = store.getState().accountHistory.filter(item => item.accountId === accountId )
    const accountTotalValue = accountData.reduce((sum, next) => {
        return sum + parseInt(next.itemVal)
    }, 0)
    return accountTotalValue
}



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
const addEvent = new EventDelegate();

//定義一個事件處理函數
function Handler_Add1(args1, args2, args3) {
    store.dispatch(accountAdded({id: args1, name: args2, type:args3}))
}

//將事件處理函數添加到事件委派中(綁定兩個Handler到一個Event)
addEvent.addHandler(Handler_Add1);


export function AddAccount(args1, args2, args3){
    addEvent.invoke(args1, args2, args3)
}


//=========================================DELETE=========================================
const deleteEvent = new EventDelegate();

function Handler_Delete1(args1) {
    store.dispatch(accountDeleted({id: args1}));
}

function Handler_Delete2(args1) {
    store.dispatch(accountHistoryDeleted_whole({accountId: args1}));
}

deleteEvent.addHandler(Handler_Delete1);
deleteEvent.addHandler(Handler_Delete2);

export function DeleteAccount(args1){
    deleteEvent.invoke(args1)
}






//=========================================EDIT=========================================
const editEvent = new EventDelegate();

function Handler_Edit1(args1, args2, args3) {
    store.dispatch(accountEdited({id: args1, name: args2, type: args3})); 
}

editEvent.addHandler(Handler_Edit1);

export function EditAccount(args1, args2, args3){
    editEvent.invoke(args1, args2, args3)
}





