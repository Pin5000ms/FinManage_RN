import * as actionTypes from './actionTypes'

export function accountAdded(inputText, inputNumber){
    return {
        type: actionTypes.ADD,
        payload: {
            text: inputText,
            number: inputNumber
          }
    }

}


export function accountDeleted(inputKey){
    return {
        type: actionTypes.DELETE,
        payload: {
            key: inputKey
          }
    }

}

export function accountEdited(inputKey, inputText, inputNumber){
    return {
        type: actionTypes.DELETE,
        payload: {
            key: inputKey,
            text: inputText,
            number: inputNumber
          }
    }

}