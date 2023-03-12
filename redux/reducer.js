import * as actionTypes from './actionTypes'
export default function reducer(state = []/*預設為空*/, action){
    switch(action.type){

        case actionTypes.ADD:
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

        case actionTypes.DELETE:
            return state.filter(item => item.key!==action.payload.key);


        case actionTypes.EDIT:
            
            return state.map(item => item.key===action.payload.key ? 
                {...item, name: action.payload.name, value: action.payload.value, type: action.payload.type} :
                 item);

        default:
            return state;
    }
}