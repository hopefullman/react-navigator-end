export default class navigatorUtil {
  static resetToHome(params){
    // const {navigation}=params;
    params.navigate("Home")
  }

  static goBack(navigation){
    navigation.goBack();
  }

  static goPage(page,params){
    const navigation =navigatorUtil.navigation;
    navigation.navigate(page,{...params});
  }
}