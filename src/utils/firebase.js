import database from '@react-native-firebase/database'

export const enterRoom = async ()=>{
    return await database()
        .ref('/')
        .once('value')
}


export const getPlayer1Name = async (roomNumber)=>{
    let temp
     await database()
        .ref(`/${roomNumber}/player1/name`)
        .once('value')
        .then(snapshot => {
            temp=snapshot.val();
          });
    return temp;
}



export const getResult = async (roomNumber)=>{
     return await database()
        .ref(`/${roomNumber}/record`)
        .once('value')

}

export const listerningTask = async (roomNumber)=>{
    return await database()
       .ref(`/${roomNumber}/task`)
       .once('value')

}

export const setyourtask = async (roomNumber,task)=>{
    return await database()
       .ref(`/${roomNumber}`)
       .update({
           task:task
       })

}

export const clearTemp = async (roomNumber)=>{
     await database()
       .ref(`/${roomNumber}/player1`)
       .update({
           temp:"",
           status:"n"
       })
    await database()
       .ref(`/${roomNumber}/player2`)
       .update({
            temp:"",
            status:"n"
       })

}

export const listenRoom = async (roomNumber)=>{
    let temp = roomNumber.toString();
     await database()
        .ref(`/${roomNumber}/player2/name`)
        .on('value', snapshot => {
            console.log('User data: ', snapshot.val());
          });
}

export const openRoom = async (name,roomNumber)=>{
    let temp = roomNumber.toString();
    await database()
    .ref('/')
    .child(temp)
    .set({
        record: "",
        task:"",
        player1:{
            name:name,
            status:"n",
            temp:""
        },
        player2:{
            name:"",
            status:"n",
            temp:""
        }
    })
}

export const decideTemp = async (roomNumber,choice,player,status)=>{
    console.log(roomNumber)
    await database()
    .ref(`/${roomNumber}/${player}`)
    .update({
        temp:choice,
        status:status
    })
}

export const startGame = async (roomNumber)=>{
    await database()
    .ref(`/${roomNumber}`)
    .update({
        status:"start"
    })
}

export const storeResult = async (roomNumber,lose,yourName,OpponentName,task)=>{
    let win;
    if(lose)
    {
        win=OpponentName
        lose=yourName
    }
    else
    {
        win=yourName
        lose=OpponentName
    }
    let now=new Date();
    let date = now.getDate();
    let month = now.getMonth()+1;
    let day = date+'/'+month;
       

    await database()
    .ref(`/${roomNumber}/record`)
    .child(task)
    .set({
        win:win,
        lose:lose,
        day:day
        
    })
}

export const stopGame = async (roomNumber)=>{
    await database()
    .ref(`/${roomNumber}`)
    .update({
        status:"notstart"
    })
}


export const listernOpponentDecision = async (roomNumber,player)=>{
    let temp
    await database()
        .ref(`/${roomNumber}/${player}/temp`)
        .on('value', snapshot => {
            temp= snapshot.val();
          });
    return temp
}

export const setPlayer = async (name,roomNumber)=>{
    
    return await database()
    .ref(`/${roomNumber}/player2`)
    .update({
      name:name
    })
    .then(() => console.log('Data updated.'));
}


export const getOpponentDecision = async (roomNumber,player)=>{
    let temp 
     await database()
    .ref(`/${roomNumber}/${player}/temp`)
    .once('value')
    .then(snapshot => {
        temp=snapshot.val();
      });
    return temp;
}
