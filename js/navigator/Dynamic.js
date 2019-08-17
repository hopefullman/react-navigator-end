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
import {createStackNavigator, createBottomTabNavigator, createSwitchNavigator} from 'react-navigation';
import navigatorUtil from './navigatorUtil';
import PopularPage from '../pages/PopularPage';
import FavoratePage from '../pages/FavoratePage';
import TrendPage from '../pages/TrendPage';
import MyPage from '../pages/MyPage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';

const DynamicTabs={
       PopularPage:{
                screen:props=><PopularPage/>,
                navigationOptions:{
                  tabBarLabel:'最新',
                  tabBarIcon:({tintColor,focused})=>(
                    <FontAwesome5 name='hotjar' size={23} style={{color:tintColor}}/>
                  )
                }
              },
              FavoratePage:{
                screen:props=><FavoratePage/>,
                navigationOptions:{
                  tabBarLabel:'收藏',
                  tabBarIcon:({tintColor,focused})=>(
                    <MaterialIcons name='favorite' size={23} style={{color:tintColor}}/>
                  )
                }
              },
              TrendPage:{
                screen:props=><TrendPage/>,
                navigationOptions:{
                  tabBarLabel:'趋势',
                  tabBarIcon:({tintColor,focused})=>(
                    <Feather name='trending-up' size={23} style={{color:tintColor}}/>
                  )
                }
              },
              MyPage:{
                screen:props=><MyPage/>,
                navigationOptions:{
                  tabBarLabel:'我的',
                  tabBarIcon:({tintColor,focused})=>(
                    <Fontisto name='person' size={23} style={{color:tintColor}}/>
                  )
                }
              }
      }
class Dynamic extends Component{
   createDynamicTabs_(){
    const {PopularPage,TrendPage,MyPage,FavoratePage}=DynamicTabs;
    const DynamicTabs_={PopularPage,FavoratePage,TrendPage,MyPage};
    PopularPage.navigationOptions.tabBarLabel='最新';
    return createBottomTabNavigator(DynamicTabs_,{
            tabBarOptions: {
              labelStyle: {
                fontSize: 13,
              },
              activeTintColor:this.props.theme
            }
          })
    }
  render(){
    
    const Tabs=this.createDynamicTabs_();
    return (
      <Fragment>
        <Tabs/>
      </Fragment>
      )
  }
}
const styles = StyleSheet.create({
 tabBarStyle:{
  fontSize:20
 }
});
const mapStateToProps=(state)=>{
  return {
    theme:state.theme.theme
  }
}
export default connect(mapStateToProps,null)(Dynamic);
