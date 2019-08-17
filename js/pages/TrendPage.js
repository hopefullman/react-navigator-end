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
  Modal
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import NavigatorBar from '../navigator/NavigatorBar';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
class TrendPage extends Component{
  constructor(props){
    super(props)
      this.state={
        visible:false
      }
      this.trends=[{'keyname':'今 日','key':'day'},{'keyname':'本 周','key':'week'},{'keyname':'本 月','key':'month'}]
  }
  render(){
    return (
      <View style={{width:width,flex:1}}>
        <NavigatorBar
            hide={false}
            titleView=<TouchableHighlight onPress={()=>this.props.trendShow()}><View style={{flexDirection:'row',alignItems:'center'}}><Text style={{fontSize:17,color:'#fff'}} >趋势</Text><Text style={{paddingLeft:10,fontSize:17,color:'#fff'}}>{this.props.trend}</Text><AntDesign name="caretdown" size={10} color="#fff" style={{paddingLeft:10}}/></View></TouchableHighlight>/>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.props.visible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <TouchableHighlight onPress={()=> {this.props.trendHiden()} } style={{width:width,height:height,backgroundColor:'rgba(0,0,0,0.6)',flexDirection:'column',alignItems:'center',justifyContent:'flex-start'}}>
            <View style={{marginTop:30,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
              <AntDesign name="caretup" size={15} color="#fff"/>
              <View style={{marginTop:-5,width:80,height:100,flexDirection:'column',alignItems:'center',backgroundColor:'#fff',justifyContent:'space-around',borderWidth:1,borderColor:"#fff",borderRadius:5}}>
              {
                this.trends.map((item,index)=>{
                  return <Text key={index} onPress={()=> this.props.changeTrend(item) } style={{color:'#000',fontSize:15}}>{item.keyname}</Text>
                })
              }
            </View>
            </View>
          </TouchableHighlight>
        </Modal>
      {/*<Text>TrendPage</Text>
        <TouchableHighlight onPress={()=>{this.props.changeActiveTintColor('#00F')}}><Text style={styles.Text}>再换颜色</Text></TouchableHighlight>*/}
        
      </View>
      )
  }
}
const mapStateToProps=(state)=>{
  return {
    trend:state.trend.trend,
    visible:state.trend.visible,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    trendShow(){
      const action={
        type:'trendShow',
        visible:true
      }
      dispatch(action);
    },
    trendHiden(){
      const action={
        type:'trendHiden',
        visible:false
      }
      dispatch(action);
    },
    changeTrend(item){
      const action={
        type:'changeTrend',
        item:item
      }
      dispatch(action);
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

export default connect(mapStateToProps,mapDispatchToProps)(TrendPage);
