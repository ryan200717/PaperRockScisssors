/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import NavigationContainer from './src/navigations/NavigationContainer'
import { createStore, combineReducers,applyMiddleware } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {enableScreens} from 'react-native-screens'
import StoreResultReducer from './src/store/reducer/storeResult'


enableScreens();

const rootReducer = combineReducers({
  StoreResult: StoreResultReducer,

});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

const App =()  => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaView style={{flex:1}}>
          <NavigationContainer/>
        </SafeAreaView>
      </PaperProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
