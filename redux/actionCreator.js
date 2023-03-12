import * as actionTypes from './actionTypes'

export function accountAdded(inputText, inputNumber, inputType){
    return {
        type: actionTypes.ADD,
        payload: {
            name: inputText,
            value: inputNumber,
            type: inputType
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

export function accountEdited(inputKey, inputText, inputNumber, inputType){
    return {
        type: actionTypes.EDIT,
        payload: {
            key: inputKey,
            name: inputText,
            value: inputNumber,
            type: inputType
          }
    }

}