import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet ,SafeAreaView,Image,Text} from 'react-native';
import {Button,IconButton} from 'react-native-paper'
import * as firebase from '../../utils/firebase';

const BattleDisplay = (props) => {
    const [timer,setTimer] = useState(5);
    const [show,setShow] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [id,setId]=useState()

    const changeTimer=()=>{
        setIsActive(true)
        setTimer((prevState)=> prevState-1)
    }

    const Counter = async ()=>{
        try {
            setId(setInterval(() => {
                changeTimer()
            }, 1000))
          }
          catch(error){
            console.log(error)       
          }
    }
    
    const display=()=>{
        switch(props.choose){
            case 'paper': return(<Image style={props.lose&&show?styles.LoseImage:styles.Image} resizeMode='contain'  source={require(`../../../assests/paper.png`)}/>)
            case 'rock': return(<Image style={props.lose&&show?styles.LoseImage:styles.Image} resizeMode='contain'  source={require(`../../../assests/rock.png`)}/>)
            case 'scissors': return(<Image style={props.lose&&show?styles.LoseImage:styles.Image} resizeMode='contain'  source={require(`../../../assests/scissors.png`)}/>)
            default: return(<Image style={styles.Image} resizeMode='contain'  source={require(`../../../assests/questionmark.png`)}/>)
        }
    }

    const opponentDisplay=()=>{
        if(show){
            switch(props.opponentDecisionDisplay){
                case 'paper': return(<Image style={props.opponentLose?styles.LoseImage:styles.Image} resizeMode='contain'  source={require(`../../../assests/paper.png`)}/>)
                case 'rock': return(<Image style={props.opponentLose?styles.LoseImage:styles.Image} resizeMode='contain'  source={require(`../../../assests/rock.png`)}/>)
                case 'scissors': return(<Image style={props.opponentLose?styles.LoseImage:styles.Image} resizeMode='contain'  source={require(`../../../assests/scissors.png`)}/>)
                default: return(<Image style={styles.Image} resizeMode='contain'  source={require(`../../../assests/questionmark.png`)}/>)
            }
        }
        else {return(<Image style={styles.Image} resizeMode='contain'  source={require(`../../../assests/questionmark.png`)}/>)}
    }

    useEffect(()=>{
         if(props.startTimer)
         {
             props.stopTimer();
             console.log("asdds")
             Counter();
         } 
         if(timer === 0){    
             clearInterval(id)
             setIsActive(false)
             setTimer(5)

             if(props.player=='player1' && (props.lose||props.opponentLose))
                    firebase.storeResult(props.roomNumber,props.lose,props.yourName,props.opponentName,props.task)

             if(props.lose){
                alert ("you lose")
                props.settingBattleStatus();
                props.setResult(props.opponentName,props.yourName)
             }
             else if (props.opponentLose){
                alert('you win')
                props.settingBattleStatus();
                props.setResult(props.yourName,props.opponentName)
             }
            else
                alert('play again')

            setShow(true)

         }},[timer,props.startTimer])

    return ( 
    <SafeAreaView style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        <View style={{flex:1}}>
            {display()}
            <Text style={styles.Text}>Yours</Text>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                {props.status?<IconButton  icon="check-all" color='grey'size={15}/>:null}
            </View>
        </View>
        
        <View style={{flex:1}}>
            <Image style={styles.Image} resizeMode='contain'  source={require('../../../assests/vs.png')}/>
                {isActive?<Text style={{textAlign:'center'}}>{timer}</Text>:<Button mode="text" labelStyle={{fontSize:10}}  style={{height:'50%'}} onPress={()=>{props.nextGame();setShow(false)}}> Next Game</Button>}
        </View>

        <View style={{flex:1}}>
            {opponentDisplay()}
            <Text style={styles.Text}>Opponent</Text>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                {props.opponentStatus?<IconButton  icon="check-all" color='grey'size={15}/>:null}
            </View>
        </View>
    </SafeAreaView>);
}


const styles = StyleSheet.create({
    Image:{
        width:'100%',
        height:'100%',
        opacity:1
    },
    LoseImage:{
        width:'100%',
        height:'100%',
        opacity:0.1
    },
    Text:{
        textAlign:'center',
    }
});
 
export default BattleDisplay;