import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  Dimensions,
  TextInput
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import NavigatorBar from '../navigator/NavigatorBar';
import navigatorUtil from '../navigator/navigatorUtil';
import Entypo from 'react-native-vector-icons/Entypo';
class FetchDemo extends Component{
  constructor(props){
    super(props);
    this.state={
      showtext:''
    }

  }
  search(){
    let url=`https://api.github.com/search/repositories?q=${this.searchkey}`
    fetch(url)
    .then(response=>{
      if (response.ok) {
          return response.text()
      }else{
          throw new Error('请求失败')
      }
    })
    .then(responseText=>{
      this.setState({
        showtext:responseText
      })
    })
    .catch((err)=>{
      this.setState({
        showtext:err.toString()
      })
    })
  }
  render(){
    const { navigation } = this.props;
    let leftButton = (
      <Entypo
        containerStyle={{paddingLeft: 10}}
        size={20}
        color="#333"
        name="chevron-thin-left"
        type="Entypo"
        onPress={() => {
          navigatorUtil.goBack(navigation);
        }}/>);
    return (
      <Fragment>
        <NavigatorBar
            hide={false}
            title={'FetchDemo'}
            style={{backgroundColor: '#fff'}}
            leftButton={leftButton}/>
        <Text>FetchDemo</Text>
        <View style={styles.ViewStyle}>
          <TextInput
            style={styles.TextInput}
            onChangeText={(text) => this.searchkey=text } />
          <TouchableHighlight onPress={()=>this.search()}><Text>搜索一下</Text></TouchableHighlight>
        </View>
        <Text>{this.state.showtext}</Text>
      </Fragment>
      )
  }
}
const { Width,Height } = Dimensions.get('window');
const styles = StyleSheet.create({
  ViewStyle:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
 TextInput:{
  width:300,
  borderColor:'#444',
  borderWidth:1
 }
});

export default FetchDemo;
