import React, { Component, useState, useEffect } from 'react';
import { View,Text,StyleSheet,Dimensions, Alert } from 'react-native';
import CurvedHeader from '../../UI/CurvedHeader'
import BattleDisplay from '../../components/BattleDisplay/BattleDisplay'
import SelectContainer from '../../components/SelectContainer/SelectContainer'
import { Button,TextInput , IconButton,ProgressBar} from 'react-native-paper';
import * as firebase from '../../utils/firebase';
import database from '@react-native-firebase/database'
import * as result from '../../utils/result'
import Card from '../../components/Card/Card'
import { useDispatch } from 'react-redux';
import * as resultStoring from '../../store/actions/storeResult'

const Game = (props) => {
    const dispatch=useDispatch();
    const[task,setTask]=useState(null)
    const[tempText,setTempText]=useState(null)
    const[winner,setWinner]=useState(null)
    const[loser,setLoser]=useState(null)
    const[lose,setLose]=useState(false)
    const[startTimer,setStartTimer]=useState(false)
    const[opponentLose,setOpponentLose]=useState(false)
    const[status,setStatus]=useState(false)
    const[opponentStatus,setOpponentStatus]=useState(false)
    const[choose,setChoose]=useState(null)
    const[battleStatus,setBattleStatus]=useState('question')
    const[enableConfirm,setEnableConfirm]=useState(null)
    const [disableConfirm,setDisableConfirm] = useState(false);
    const [opponentDecisionDisplay,setOpponentDecisionDisplay] = useState(null);
    const opponentPlayer = props.navigation.state.params.player =='player1' ? 'player2':'player1'
    
    const SubmitTask=async()=>{
        if(tempText=='')
            alert('please enter your task')
        setTask(tempText)
        setEnableConfirm(true)
        await firebase.setyourtask(props.navigation.state.params.roomNumber,tempText)

    }

    const settingBattleStatus=()=>{
        setBattleStatus('decide')
    }
    
    const stopTimer=()=>{
        setStartTimer(false)
    }

    const start= async()=>{
        try{await firebase.startGame(props.navigation.state.params.roomNumber)}
        catch(error){}
    }

    const setResult= (winner,loser)=>{
        setWinner(winner),
        setLoser(loser)
    }

    const nextGame = async()=>{
        try{
            await firebase.decideTemp(props.navigation.state.params.roomNumber,"",props.navigation.state.params.player,"n")
            await firebase.clearTemp(props.navigation.state.params.roomNumber)
            setStatus(false)
            setChoose(null)
            setOpponentDecisionDisplay(null)
            setDisableConfirm(false)
            setOpponentStatus(false)
            setLose(false)
            setOpponentLose(false)
            setEnableConfirm(false)
            setBattleStatus('question')
            setWinner(null);
            setLoser(null)
        }
        catch(error){}
    }
    
    const choiseFunction=(choise)=>{
        setChoose(choise)
    }

    const getOpponentDecision= async()=>{
        let temp;
        let FinalResult;
        try{
            temp = await firebase.getOpponentDecision(props.navigation.state.params.roomNumber,opponentPlayer)
        }
        catch(error){}
        
        setOpponentDecisionDisplay(temp);
        FinalResult=result.outputResult(choose,temp);
        if(FinalResult==choose){
            setOpponentLose(true)
        }
            
        else if (FinalResult==temp)
            {setLose(true)}

        setStartTimer(true)

    }

    const updateYourChoice= async ()=>{
        try{
            await firebase.decideTemp(props.navigation.state.params.roomNumber,choose,props.navigation.state.params.player,"y")
            setStatus(true)
            setDisableConfirm(true)
        }
        catch(error){}
    }

    
    const NavToRecord= ()=>{
        props.navigation.navigate({routeName: "Result", params: { roomNumber:props.navigation.state.params.roomNumber,yourName:props.navigation.state.params.name}})
        
    }

    
    useEffect(()=>{
        let onValueChange;
        let listernTask;
            onValueChange = database()
           .ref(`/${props.navigation.state.params.roomNumber}/${props.navigation.state.params.player =='player1' ? 'player2':'player1'}/status`)
           .on('value',snapshot=>{ 
               if(snapshot.val()=='y'){
                    setOpponentStatus(true)
                    if(status==true){
                        console.log('firm'),
                        getOpponentDecision();
                    }
                }
           })

           listernTask = database()
           .ref(`/${props.navigation.state.params.roomNumber}/task`)
           .on('value',snapshot=>{
               if(snapshot.val()!=''){
                    setTask(snapshot.val())
                    setEnableConfirm(true)
                }
           })
       
           return()=>{
                    database()
                     .ref(`/${props.navigation.state.params.roomNumber}/${props.navigation.state.params.player =='player1' ? 'player2':'player1'}/status`)
                     .off('value',onValueChange)
                    database()
                     .ref(`/${props.navigation.state.params.roomNumber}/task`)
                     .off('value',listernTask)
                     
                     dispatch(resultStoring.deleteResultRedux())
                    }

    },[status])



    return ( 
        <View style={{flex:1}}>
            {task ? null : <View style={{flex:2}}>
                                <CurvedHeader customStyles={styles.svgCurve} />
                           </View>
            }
            <View style={{flex:1,justifyContent:'center',flexDirection:'row'}}>
                <TextInput  
                    style={styles.Input}
                    mode='outlined'
                    label="Please Enter Your Task You Want To Allocate And Then Start the Game"
                    value={tempText}
                    onChangeText={text => setTempText(text)}/>
                <IconButton  icon="arrow-right-bold-circle" color='grey'size={65} style={styles.Button} onPress={SubmitTask}/>
            </View>
            
            <View style={{flex:1.4,marginTop:5}}>
                {task ? <Card  battleStatus={battleStatus} yourName={props.navigation.state.params.name} task={task} win={winner} lose={loser} day={new Date()}/> : null }
            </View>
        
            <View style={{flex:2}}>
                <BattleDisplay 
                    lose={lose}
                    yourName={props.navigation.state.params.name}
                    opponentName={props.navigation.state.params.opponentName}
                    opponentLose={opponentLose}
                    status={status}
                    opponentStatus={opponentStatus}
                    choose={choose}
                    start={start}
                    nextGame={nextGame}
                    opponentDecisionDisplay={opponentDecisionDisplay}
                    startTimer={startTimer}
                    stopTimer={stopTimer}
                    task={task}
                    player={props.navigation.state.params.player}
                    roomNumber={props.navigation.state.params.roomNumber}
                    settingBattleStatus={settingBattleStatus}
                    setResult={setResult}/>
            </View>

            <View  style={{flex:1}}>
                <SelectContainer choose={choose} choise={choiseFunction} disabled={disableConfirm}/>
            </View>

            <View style={{flex:2}}>
                <Button icon="earth" mode="text" labelStyle={{fontSize:40}}  disabled={disableConfirm||(!enableConfirm)} style={{height:'50%'}} onPress={updateYourChoice}>Confirm</Button>
                <Button icon="earth" mode="text" labelStyle={{fontSize:40}}  style={{height:'50%'}} onPress={NavToRecord}>Record</Button>
            </View>
        </View> );
}

Game.navigationOptions={
    headerShown:false
  }
 
const styles = StyleSheet.create({
    svgCurve: {
        position:'absolute',
        width: Dimensions.get('window').width,
        height:'100%'
      },
      Input:{
        flex:1,
        padding:20,
    },
    Button:{
        padding:10,
    }
});

export default Game;