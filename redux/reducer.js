import * as actionTypes from './actionTypes'
export default function reducer(state = [], action){
    const newState = [...state];
    switch(action.type){

        case actionTypes.ADD:
            let newItemKey = 0;
            for(i = 0; i < 999999; i++)
            {
                const index = state.findIndex(function(element) {
                    return element.key == i
                });
                if(index == -1){
                    newItemKey = i;
                    break;
                }
            }
            return [...newState,
                    {
                        key: newItemKey, 
                        name: action.payload.text, 
                        value: action.payload.number    }]     

        case actionTypes.DELETE:
            return newState.filter(item => item.key!==action.payload.key);


        case actionTypes.EDIT:
            
            return newState.map(item => item.key===action.payload.key ? 
                {...item, name: action.payload.text, value: action.payload.number} :
                 item);    
        default:
            return state;
    }
}