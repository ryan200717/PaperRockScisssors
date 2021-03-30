import { parse } from "react-native-svg";

export const STORE_RESULT = "STORE_RESULT";
export const DELETE_RESULT = "DELETE_RESULT";
export const GET_RESULT = "GET_RESULT";


export const storeResultRedux=(result)=>{
    
    return (dispatch)=>{
        let temp = JSON.stringify(result)
        let temp1 = JSON.parse(temp)
        
        let key = Object.keys(result.val());
        let entries = Object.entries(result.val())
     
        let array=[]
        entries.map(m=> 
            array.push({
                        
                        task:m[0],
                        win:m[1].win,
                        lose:m[1].lose,
                        day:m[1].day
            })        
        )

        dispatch ({
            type : STORE_RESULT,
            result:array
        })
            
    }
}

export const GetResultRedux=()=>{
    return (dispatch)=>{

        dispatch ({
            type : GET_RESULT
        })
            
    }
}



export const deleteResultRedux=()=>{
    return dispatch=>{
        dispatch ({
            type : DELETE_RESULT,

        })
            
    }
}