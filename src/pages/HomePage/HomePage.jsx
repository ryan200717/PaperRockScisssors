import React, { Component, useState } from 'react';
import { View,Text,StyleSheet,Image,Dimensions, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { IconButton } from 'react-native-paper';
import * as firebase from '../../utils/firebase';
import CurvedHeader from '../../UI/CurvedHeader'

const HomePage = (props) => {
    const [name,setName]=useState()
    
    const navPage = async ()=>{  
           // props.navigation.navigate('GamePage')
            props.navigation.navigate({routeName: "GamePage", params: { name: name}})
    }

    return ( 
    <KeyboardAvoidingView style={styles.HomePageContainer}>
          
        <CurvedHeader customStyles={styles.svgCurve} />
        <Text style={{textAlign:'center',fontSize:30,fontWeight:'bold',marginTop: 35}}> Welcome</Text>
          
        <View style={styles.ImageContainer}>
            <Image style={styles.Image}source={require('../../../assests/paperrockscissors.png')}/>
        </View>

        <Text style={{fontSize:40,textAlign:'center',fontWeight: 'bold'}}>
            Your Name is {name}
        </Text>
        
        <TextInput 
            style={styles.Input}
            mode='outlined'
            label="YourName"
            value={name}
            onChangeText={text => setName(text)}/>
        

        <View style={styles.ButtonCotainer}>  
            <Text style={{fontSize:20,marginTop:40,textAlign:'left',fontWeight: 'bold'}}>
                Login and Play with others
            </Text>        
            <IconButton  icon="arrow-right-bold-circle" color='grey'size={70} style={styles.Button}  onPress={()=>navPage()}/> 
        </View>

    </KeyboardAvoidingView> );
}


HomePage.navigationOptions={
    headerShown:false
  }

const styles = StyleSheet .create({
    HomePageContainer:{
        flex:1,
    },
    ImageContainer:{
        flex:3,
    },
    Image:{
        flex:1,
        marginTop:5,
        width:'100%',
        height:'30%'
    },
    Input:{
        flex:0.5,
        padding:5,
    },
    ButtonCotainer:{
        flex:1,
        justifyContent:'flex-end',
        flexDirection:'row'
    },
    svgCurve: {
        position: 'absolute',
        color:'red',
        width: Dimensions.get('window').width,
        height:'100%'
      },

    Button:{
        
        
    }
});
 
export default HomePage;