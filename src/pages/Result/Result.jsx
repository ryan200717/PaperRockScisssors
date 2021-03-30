import React, { Component, useEffect } from 'react';
import { View,Text,FlatList ,Platform} from 'react-native';
import Card from '../../components/Card/Card'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as resultStoring from '../../store/actions/storeResult'
import * as firebase from '../../utils/firebase';

const Result = (props) => {
    const dispatch = useDispatch();
    const avaiableResult = useSelector(state=>state.StoreResult.result)
    
    
    useEffect(()=>{
        let response
        const getData=async()=>{
            let temp
            try{    
                temp = await firebase.getResult(props.navigation.state.params.roomNumber)
            }
            catch(error){}
            dispatch(resultStoring.storeResultRedux(temp));
            
            return temp
        }
       
       
         response = getData()
        console.log(response)
        //dispatch(resultStoring.storeResultRedux())
    },[])
    return ( 
        <View style={{flex:1}}>
            <FlatList
                data={avaiableResult}
                keyExtractor={item=>item.task}
                renderItem={({ item, index, separators }) => (
                    <View
                        key={item.task}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}>
                        
                        <Card battleStatus='decide' yourName={props.navigation.state.params.yourName} task={item.task} win={item.win} lose={item.lose} day={item.day}/>
                    </View>
                    
                )}
            />
            
        </View>
     );
}
 
export default Result;