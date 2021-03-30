import React, { Component } from 'react';
import { View,Text, StyleSheet,Image } from 'react-native';
import {IconButton,Divider} from 'react-native-paper'

const Card = (props) => {
    console.log(props.yourName, props.win)

    const lobby = ()=>{
        switch(props.battleStatus)
        {
            case 'question': return (
                <View style={styles.questionCardstyle}>
                    <View style={{flex:2,flexDirection:'row'}}>
                        <View style={styles.imageContainer}>
                            <IconButton  icon="help" color='yellow'size={65} style={styles.Button} />
                        </View>
                    </View>
                    
                    <View style={{flex:5,justifyContent:'center'}}>
                        <View style={{ height: 70, flex:1,justifyContent:'center' }}>
                            <Text style={{ textAlign:'auto' ,fontSize:25,fontWeight:'bold' }}>Task {props.task}</Text>
                            <Text style={{ textAlign:'justify' ,fontSize:15 }}>Win  || </Text>
                            <Text style={{ textAlign:'justify' ,fontSize:15 }}>Lose || Task allocate to  </Text>
                        </View>
                    </View>
                </View>)

            case 'decide': return(
                <View style={props.win == props.yourName?styles.cardstyle:styles.loseCardstyle}>
                    <View style={{flex:2,flexDirection:'row'}}>
                        <View style={styles.imageContainer}>
                            {props.win == props.yourName ?<IconButton  icon="check" color='green'size={65} style={styles.Button} /> : <IconButton  icon="close" color='red'size={65} style={styles.Button} />}
                        </View>
                    </View>
                    
                    <View style={{flex:5,justifyContent:'center'}}>
                        <View style={{ height: 70, flex:1,justifyContent:'center' }}>
                            <Text style={{ textAlign:'auto' ,fontSize:25,fontWeight:'bold' }}>Task {props.task}</Text>
                            <Text style={{ textAlign:'justify' ,fontSize:15 }}>Win  || {props.win}</Text>
                            <Text style={{ textAlign:'justify' ,fontSize:15 }}>Lose || Task allocate to {props.lose} </Text>
                        </View>
                    </View>
                </View>
            )
            default: null
        }

    }


    return ( 
        <View style={{flex:1}}>
            {lobby()}
        </View>

     );
}

const styles = StyleSheet.create({
    questionCardstyle:{
        margin:25,
        flexDirection:'row',
        shadowColor: 'yellow',
        shadowOpacity: 0.26,
        shadowOffset: { width: 5, height: 2 },
        shadowRadius: 8,
        elevation: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        flex:1
      },
    cardstyle:{
        margin:25,
        flexDirection:'row',
        shadowColor: 'green',
        shadowOpacity: 0.26,
        shadowOffset: { width: 5, height: 2 },
        shadowRadius: 8,
        elevation: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        flex:1
      },
    loseCardstyle:{
        margin:25,
        flexDirection:'row',
        shadowColor: 'red',
        shadowOpacity: 0.26,
        shadowOffset: { width: 5, height: 2 },
        shadowRadius: 8,
        elevation: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        flex:1
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        borderRightWidth:2,
        borderColor:'lightgrey',
    
      }
});
 
export default Card;