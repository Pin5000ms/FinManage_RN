const ADD = "add";
const DELETE = "delete";
const EDIT = "edit";

export default function reducer(state = []/*預設為空*/, action){
    switch(action.type){

        case ADD:
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
            return [...state,
                    {
                        key: newKey, 
                        name: action.payload.name, 
                        value: action.payload.value,
                        type: action.payload.type}]     

        case DELETE:
            return state.filter(item => item.key!==action.payload.key);


        case EDIT:
            
            return state.map(item => item.key===action.payload.key ? 
                {...item, name: action.payload.name, value: action.payload.value, type: action.payload.type} :
                 item);

        default:
            return state;
    }
}





export function accountAdded(inputText, inputNumber, inputType){
    return {
        type: ADD,
        payload: {
            name: inputText,
            value: inputNumber,
            type: inputType
          }
    }

}

export function accountDeleted(inputKey){
    return {
        type: DELETE,
        payload: {
            key: inputKey
          }
    }

}

export function accountEdited(inputKey, inputText, inputNumber, inputType){
    return {
        type: EDIT,
        payload: {
            key: inputKey,
            name: inputText,
            value: inputNumber,
            type: inputType
          }
    }

}