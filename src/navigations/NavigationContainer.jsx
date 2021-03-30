import React, { Component } from 'react';
import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import HomePage from '../../src/pages/HomePage/HomePage'
import GamePage from '../pages/GamePage/GamePage';
import Game from '../pages/Game/Game'
import Result from '../pages/Result/Result'

const FunctionNavigatior = createStackNavigator({
    
    HomePage:HomePage,
    GamePage:GamePage,
    Game:Game,
    Result:Result
})

export default createAppContainer(FunctionNavigatior)
