import React, { Component, useState, useEffect, useRef } from 'react';
import { View,Input,Text,StyleSheet,Dimensions,ActivityIndicator } from 'react-native';
import * as firebase from '../../utils/firebase';
import CurvedHeader from '../../UI/CurvedHeader'
import Lobby from '../../components/Lobby/Lobby'
import database from '@react-native-firebase/database'

const GamePage = (props) => {
    
    const [roomNumber,setRoomNumber]=useState()
    const [status,setStatus]=useState(null)
    const [loading,setLoading]=useState(null)
    const [openRoomLoading,setOpenRoomLoading]=useState(false)

    const joinRoom=(room)=>{
        setStatus("joinRoom")
        
    }
    
    const confirmJoinRoom=async(room)=>{
        let response;
        let player1Name;
        let temp;

        setRoomNumber(room);
        try{
             response = await firebase.enterRoom();
             
        }
        catch(error){}
        temp = Object.keys(response.val())
        let found = temp.find(a=>a==room.toString());
        if(found==undefined)
            alert('There are No '+ room +" room exists")
        else
        {
            try{
                await firebase.setPlayer(props.navigation.state.params.name,room)
                player1Name = await firebase.getPlayer1Name(room)
                props.navigation.navigate({routeName: "Game", params: { name: props.navigation.state.params.name, opponentName:player1Name, roomNumber:room, player:'player2'}})
            }
            catch(error){}
        }
    }

    const backToLobby=()=>{
        setRoomNumber(null)
        setStatus(null)
    }
    

    const openRoom = async ()=>{
        let roomNumberTemp = Math.floor(100000 + Math.random() * 900000);
        try{
            setStatus("openRoom")
            setRoomNumber(roomNumberTemp)
            setLoading(true)
            setOpenRoomLoading(true)
            await firebase.openRoom(props.navigation.state.params.name,roomNumberTemp)
        }
        catch(error){console.log(error)}
        setOpenRoomLoading(false)
    }

    useEffect(()=>{
        let listerner
        if(status=="openRoom"){
            try{
                listerner =  database()
                            .ref(`/${roomNumber}/player2/name`)
                            .on('value', snapshot => {
                                if(snapshot.val()!=""){
                                    setStatus(null)
                                    setRoomNumber(null)
                                    props.navigation.navigate({routeName: "Game", params: { name: props.navigation.state.params.name, opponentName:snapshot.val() , roomNumber:roomNumber, player:'player1'}})}
                            }); 
            }
            catch(error){}
        }

        return ()=>{
            database()
            .ref(`/${roomNumber}/player2/name`)
            .off('value',listerner)
        }

    },[status,roomNumber])


    return ( 
    <View style={{flex:1}}>
        <View style={{flex:2}}>
            <CurvedHeader customStyles={styles.svgCurve} />
        </View>

        <View style={{flex:5}}>
            <Lobby 
                openRoom={openRoom}
                joinRoom={joinRoom}
                confirmJoinRoom={confirmJoinRoom}
                status={status}
                name={props.navigation.state.params.name}
                loading={openRoomLoading}
                roomNumber={roomNumber}
                backToLobby={backToLobby}/>
       </View>

    </View> );
}
 
GamePage.navigationOptions={
    headerShown:false
  }

const styles = StyleSheet.create({
    svgCurve: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height:'100%'
      },
});

export default GamePage;