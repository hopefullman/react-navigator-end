import React, {Fragment,Component} from 'react';
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
import navigatorUtil from '../navigator/navigatorUtil';
import NavigatorBar from '../navigator/NavigatorBar';
class WelcomePage extends Component{
  componentDidMount(){
    this.timer=setTimeout(()=>{
      const {navigation}=this.props;
      navigatorUtil.resetToHome(navigation)
      // navigation.navigate('Home');
    },1000)
  }
  componentWillUnMount(){
    this.timer && clearTimeout(this.timer);
  }
  render(){
    return (
      <Fragment>
        <Text>WelcomePage</Text>
      </Fragment>
      )
  }
}
const styles = StyleSheet.create({
 
});

export default WelcomePage;
