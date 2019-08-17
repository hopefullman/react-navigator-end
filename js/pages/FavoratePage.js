import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {connect} from 'react-redux';
import NavigatorBar from '../navigator/NavigatorBar';
import navigatorUtil from '../navigator/navigatorUtil';
class FavoratePage extends Component{
  render(){
    return (
      <View style={{width:width,flex:1}}>
        <NavigatorBar
            hide={false}
            title={'收藏'}/>
        <Text>FavoratePage</Text>
        <TouchableHighlight onPress={()=>{navigatorUtil.goPage('FetchDemo')}}><Text style={styles.Text}>跳转到fetch</Text></TouchableHighlight>
        <TouchableHighlight onPress={()=>{this.props.changeActiveTintColor('#0f0')}}><Text style={styles.Text}>换颜色</Text></TouchableHighlight>
      </View>
      )
  }
}
const mapStateToProps=(state)=>{
  return {
    theme:state.theme.theme
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    changeActiveTintColor(theme){
      const action={
        type:'changeActiveTintColor',
        theme:theme
      }
      dispatch(action)
    }
  }
}
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
 container:{
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center'
 },
 Text:{
  paddingTop:20,
  paddingBottom:20,
  fontSize:20
 }
});

export default connect(mapStateToProps,mapDispatchToProps)(FavoratePage);
