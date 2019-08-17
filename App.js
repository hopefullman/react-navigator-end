import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import AppNavigator from './js/navigator/AppNavigator';
import store from './js/store'
const App = () => {
  return (
   <Provider store={store}>
      <AppNavigator/>
   </Provider>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
