import {STORE_RESULT,DELETE_RESULT,GET_RESULT} from '../actions/storeResult';

const initalState ={
    result:[]
}

export default (state = initalState ,action) =>{

    switch(action.type){
        case STORE_RESULT:
            return{
                ...state,
                result: action.result
            }
        case GET_RESULT:
            return{
                ...state
            }
        case DELETE_RESULT:
            return{initalState}
        default: return state;
    }
    return state;

}

