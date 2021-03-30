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

        // for(let i =0;i<key.length;i++){
        //     for(let j=0;j<2;j++)
        //     {
        //         array.push({
        //             task:entries[i][j],
        //             win:entries[i][j].win,
        //             lose:entries[i][j].lose,
        //             day:entries[i][j].day
        //     })
        //     }
                
        // }
        // console.log("array",array)
        

        // for(let key in temp1)
        // {
        //     console.log("ass"+temp1.key)
        //     // array.push({
        //     //     task:temp1.key[i],
        //     //     win:temp1.key[i].win,
        //     //     lose:temp1.key[i].lose,
        //     //     day:temp1.key[i].day
        //     // })
        // }
        


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