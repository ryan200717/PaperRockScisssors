import React, { Component, useState } from 'react';
import { View, StyleSheet ,SafeAreaView,Image,TouchableOpacity} from 'react-native';


const SelectContainer = (props) => {
    

    return ( 
        <SafeAreaView style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',padding:20}}>

            <TouchableOpacity style={props.disabled?styles.CotainerStyle:styles.DisableCotainerStyle} disabled={props.disabled} onPress={()=>props.choise('paper')}>
                <View style={props.disabled && props.choose!='paper'?styles.DisableSelectStyle:styles.selectStyle}>
                    <Image style={styles.Image} resizeMode='contain'  source={require(`../../../assests/paper.png`)}/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={props.disabled?styles.DisableCotainerStyle:styles.CotainerStyle} disabled={props.disabled} onPress={()=>props.choise('rock')}>
                <View style={props.disabled && props.choose!='rock' ?styles.DisableSelectStyle:styles.selectStyle}>
                    <Image style={styles.Image} resizeMode='contain'  source={require(`../../../assests/rock.png`)}/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={props.disabled?styles.DisableCotainerStyle:styles.CotainerStyle} disabled={props.disabled} onPress={()=>props.choise('scissors')}>
                <View style={props.disabled && props.choose!='scissors' ?styles.DisableSelectStyle:styles.selectStyle}>
                    <Image style={styles.Image} resizeMode='contain'  source={require(`../../../assests/scissors.png`)}/>
                </View>
            </TouchableOpacity>

    </SafeAreaView>);
}

const styles = StyleSheet.create({
    CotainerStyle:{
        flex:1,
        color:'green'
    },
    DisableCotainerStyle:{
        flex:1,
        color:'grey'
    },
    Image:{
        width:'100%',
        height:'100%',
    },
    Text:{
        textAlign:'center',
        marginTop:-50
    },
    selectStyle:{
        shadowColor: 'green',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        height:'100%'
      },
    DisableSelectStyle:{
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        height:'100%'
      },
});
 
export default SelectContainer;