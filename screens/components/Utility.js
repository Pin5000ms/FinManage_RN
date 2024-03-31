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
      const accountData = store.getState().accountHistory.filter(o => o.accountId === accountId )
      // Check if there is an element with id equal to i in the current state
      //console.log(accountData)
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
    return store.getState().accountHistory.filter(o => o.accountId === accountId )
}

export function getAccountSumByAccountId(accountId){
    const account = store.getState().accounts.find(o => o.id === accountId);
    if(account === null || account === undefined)
      return;
    const accountData = store.getState().accountHistory.filter(o => o.accountId === accountId )
    let accountTotalValue = 0;
    if(account.type === 'bank' || account.type === 'cash'){
      accountTotalValue = accountData.reduce((sum, next) => {
          return sum + parseInt(next.itemVal)
      }, 0)
    }
    else{
      accountTotalValue = accountData.reduce((sum, next) => {
        return sum + parseInt(next.unitVal* next.amount)
    }, 0)
    }
    return accountTotalValue
}

export function getTotalSum(){
    const sum = store.getState().accounts.reduce((sum, next) => {return sum + getAccountSumByAccountId(next.id)}, 0)
    //const sum = store.getState().accountHistory.reduce((sum, next) => {return sum + parseInt(next.itemVal)}, 0)
    return sum
}


export function getTotalSumByDate(targetDate){
  const sum = store.getState().accounts.reduce((sum, next) => {return sum + getAccountSumByAccountIdAndDate(next.id, targetDate)}, 0)
  
  //console.log(sum)
  return sum
}

export function getAccountSumByAccountIdAndDate(accountId, targetDate){
  const account = store.getState().accounts.find(o => o.id === accountId);
  if(account === null || account === undefined)
    return;

  const accountData = store.getState().accountHistory.filter(o => (o.accountId === accountId && getDate(o.timeStamp) < targetDate))

  let accountTotalValue = 0;
  if(account.type === 'bank' || account.type === 'cash'){
    accountTotalValue = accountData.reduce((sum, next) => {
        return sum + parseInt(next.itemVal)
    }, 0)
  }
  else{
    accountTotalValue = accountData.reduce((sum, next) => {
      return sum + parseInt(next.unitVal* next.amount)
  }, 0)
  }

  return accountTotalValue
}

const getDate = (timeStamp)=> {
  let l = timeStamp.split('-').length;
  const dateParts = timeStamp.split('-')[0].split('/');
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // 月份从0开始，所以需要减1
  const day = parseInt(dateParts[2]);
  let dateObject;
  if(l > 1){
    const timeParts = timeStamp.split('-')[1].split(':');
    const hour = parseInt(timeParts[0]);
    const minute = parseInt(timeParts[1]);
    const second = parseInt(timeParts[2]);
    dateObject = new Date(year, month, day, hour, minute, second);
  }
  else{
    dateObject = new Date(year, month, day);
  }
  return dateObject;
}


export function getCurrentTimeStamp(){
  let date = new Date();
  let datestr = date.getFullYear()+ '/' + (date.getMonth()+1) + '/' + date.getDate();
  const stamp = datestr + '-' + date.toTimeString()// 2024/3/31 - 00:19:42 GMT+0800 (台北標準時間)
  return stamp;
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





