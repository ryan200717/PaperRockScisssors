import React, { Component, useState } from 'react';
import { View,Text, StyleSheet,ActivityIndicator} from 'react-native';
import { Button,TextInput , IconButton} from 'react-native-paper';


const Lobby = (props) => {
    const [roomNumber,setRoomNumber] = useState(null)

    const temp = ()=>{
        switch(props.status){
            case "joinRoom":
                return(<View style={{flex:3,justifyContent:'center', alignItems:'center' ,flexDirection:'row'}}>
                            <TextInput 
                                style={styles.Input}
                                mode='outlined'
                                label="RoomNumber"
                                value={roomNumber}
                                onChangeText={text => setRoomNumber(text)}/>
                            <IconButton  icon="arrow-right-bold-circle" color='grey'size={50} style={styles.Button}  onPress={()=>props.confirmJoinRoom(roomNumber)}/>
                        </View>)

            case "openRoom":
                return(<View style={{flex:3,justifyContent:'center', alignItems:'center' ,flexDirection:'column'}}>
                            <View style={{flex:0.8,flexDirection:'column',justifyContent:'center'}}>
                                <ActivityIndicator size='large' color='purple'/>
                                <Text style={{textAlign:'center'}}>Waiting others joins</Text>
                            </View>
                        </View>)
                        
            default : 
                return(<View style={{flex:3,justifyContent:'center', alignItems:'center' ,flexDirection:'column'}}>
                            <Button icon="city-variant-outline" mode="text" labelStyle={{fontSize:40}}  style={{height:'50%'}} onPress={()=>props.openRoom()}>
                                Open Room
                            </Button>
                            <Button icon="earth" mode="text" labelStyle={{fontSize:40}}  style={{height:'50%'}}onPress={props.joinRoom}>
                                Join Room
                            </Button>
                        </View>)
        }
    }    
    
    

    return (
        <View style={{flex:1}}> 
            <View style={{flex:1,flexDirection:'row'}}>
                {props.status !== null ? <IconButton  icon="arrow-left-bold-circle" color='grey' size={50} style={styles.Button}  onPress={props.backToLobby}/>:null}
                <View style={{flex:1,justifyContent:'center'}}>
                    <Text style={styles.textFont}>Your Name is {props.name}</Text>
                    <Text style={styles.textFont}>Your RoomNumber is {props.roomNumber}</Text>
                </View>
            </View>
            {temp()}
        </View>
     )
}
 


const styles = StyleSheet.create({
    textFont:{
        fontSize:20
    },
    Input:{
        flex:1,
        padding:10,
    },
    
});

export default Lobby;

