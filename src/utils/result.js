export const outputResult =(yoursDecision,OpponentDescision)=>{
    if(yoursDecision==OpponentDescision)
        return 'same'
    switch(yoursDecision){
        case 'paper' : {
            if (OpponentDescision=='rock')
                return yoursDecision
            else
                return OpponentDescision
        }
        case 'rock' : {
            if (OpponentDescision=='scissors')
                return yoursDecision
            else
                return OpponentDescision
        }
        case 'scissors' : {
            if (OpponentDescision=='paper')
                return yoursDecision
            else
                return OpponentDescision
        }
        default: return 'same'
    }

}