import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {createMaterialTopTabNavigator} from 'react-navigation';
import navigatorUtil from '../navigator/navigatorUtil';
import NavigatorBar from '../navigator/NavigatorBar';
import {connect} from 'react-redux';
import Toast from 'react-native-easy-toast';
class PopularPage extends Component{
  constructor(props){
    super(props);
    this.DefaultTopTabs=['android','java','js','css','h5','react-native','react-navigation']
  }

  TopTabsmap(){
    const TopTabs={}
    this.DefaultTopTabs.map((item,index)=>{
      TopTabs[`tab${index}`]={
        screen:props=><PopularTabPage {...props} tabLabel={item}/>,
        navigationOptions:{
          title:item
        }
      }
    })
    return TopTabs;
  }
  render(){
    const {theme}=this.props;
    const Tabs = createMaterialTopTabNavigator(this.TopTabsmap(),{
      tabBarOptions:{
        tabStyle:styles.tabStyle,
        upperCaseLabel:false,
        scrollEnabled:true,
        style:{backgroundColor:theme},
        indicatorStyle:styles.indicatorStyle,
        labelStyle:styles.labelStyle
      }
    })
    let statusBar = {
            backgroundColor: this.props.theme,
            barStyle: 'light-content',
        };
    return (
        <View style={{width:width,flex:1}}>
          <NavigatorBar
            statusBar={statusBar}
            hide={false}
            title={'最新'}/>
          <Tabs/>
        </View>
      )
  }
}
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  style_:{
    backgroundColor:'#333'
  },
  tabStyle:{
    minWidth:50
  },
  indicatorStyle:{
    height:1,
    backgroundColor:'#fff'
  },
  labelStyle:{
    fontSize:15,
    color:'#fff',
    marginTop:5,
    marginBottom:5
  },
  indicator: {
        color: 'red',
        margin: 10
  }
});
const mapStateToProps=(state)=>{
  return {
    theme:state.theme.theme
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(PopularPage);

class PopularTab extends Component{
  constructor(props){
    super(props);
    this.state={
      isRefresh:false,
      showtext:'',
      list:[]
    }
  }
  componentDidMount(){
    this.getdata();
  }
  getdata(){
    const {tabLabel}=this.props;
    let url=`https://api.github.com/search/repositories?q=${tabLabel}&sort=stars`
    fetch(url)
    .then(response=>{
      if (response.ok) {
          return response.json();
      }else{
          throw new Error('请求失败')
      }
    })
    .then(responsejson=>{
      const {getdataAction}=this.props;
      this.setState({list:responsejson.items},()=>{getdataAction(this.props.tabLabel,this.state.list)})      
    })
    .catch((err)=>{
      this.setState({
        showtext:err.toString()
      })
    })
  }
  ListEmptyComponent(tabLabel){
    return (
      <View style={{flexDirection:'column',justifyContent:'flex-start',alignItems:'center'}}>
      <ActivityIndicator color={this.props.theme}/>
      <Text style={{color:this.props.theme}}>正在加载更多</Text>
      </View>
    )
  }
  _onRefresh_(tabLabel){
    this.setState({
      isRefresh:true
    })
    let url=`https://api.github.com/search/repositories?q=${tabLabel}&sort=stars`
    fetch(url)
    .then(response=>{
      if (response.ok) {
          return response.json();
      }else{
        this.setState({
          isRefresh:false
        })
          throw new Error('请求失败')
      }
    })
    .then(responsejson=>{
      if (this.state.list.length>100) {
        this.setState({
          isRefresh:false
        })
        this.refs.toast.show('我们是有底线的!');
        return false;
      }else{
        this.setState({
          isRefresh:false
        })
        this.setState({
        list:[...this.state.list,...responsejson.items]
      })
      }
    })
    .catch((err)=>{
      this.setState({
        showtext:err.toString()
      })
    })
  }
  _onLoadMore_(){
    // alert('_onLoadMore_')
  }
  render(){
    const {tabLabel,testtext}=this.props;
    return (
      <View style={{width:width}}>
        <Text>{tabLabel}</Text>
        <FlatList
          extraData={this.state}
          data={this.props.list[tabLabel]}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={this.ListEmptyComponent(tabLabel)}
          refreshControl={
              <RefreshControl
                title={'Loading'}
                titleColor={this.props.theme}
                refreshing={this.state.isRefresh}
                onRefresh={() => this._onRefresh_(tabLabel) }
                tintColor={this.props.theme}/>
              }
          onEndReached={() => this._onLoadMore_(tabLabel)}
          onEndReachedThreshold={0.1}
          renderItem={({ item }) => <View><Text onPress={ ()=>{ navigatorUtil.goPage('DetailPage',{DetailPageTitle:`${item.id}`}) }}>{item.id}</Text></View>}/>
          <Toast ref="toast" position={'center'} color={this.props.theme}/>
      </View>
      )
  }
}
const mapStateToPropss=(state)=>{
  return {
    theme:state.theme.theme,
    list:state.popular
  }
}
const mapDispatchToPropss=(dispatch)=>{
  return {
    getdataAction(tabLabel,list){
      const action={
        type:'getdataAction',
        names:tabLabel,
        list:list
      }
      dispatch(action);
    }
  }
}
const PopularTabPage=connect(mapStateToPropss,mapDispatchToPropss)(PopularTab)