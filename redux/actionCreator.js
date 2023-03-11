import * as actionTypes from './actionTypes'

export function accountAdded(inputText, inputNumber, inputAccountType){
    return {
        type: actionTypes.ADD,
        payload: {
            text: inputText,
            number: inputNumber,
            accountType: inputAccountType
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

export function accountEdited(inputKey, inputText, inputNumber, inputAccountType){
    return {
        type: actionTypes.EDIT,
        payload: {
            key: inputKey,
            text: inputText,
            number: inputNumber,
            accountType: inputAccountType
          }
    }

}