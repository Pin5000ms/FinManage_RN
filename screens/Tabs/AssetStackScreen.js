import { createStackNavigator } from '@react-navigation/stack';

import AssetPage from '../pages_asset/AssetPage';
import EditPage from '../pages_asset/EditPage';
import AddPage from '../pages_asset/AddPage';
import PieChartPage from '../pages_analysis/PieChartPage';
import LineChartPage from '../pages_analysis/LineChartPage';

const HomeStack = createStackNavigator();

function AssetStackScreen() {
  return(
    <HomeStack.Navigator initialRouteName="AssetPage" screenOptions={{headerShown: true}}>
      <HomeStack.Screen name="AssetPage" component={AssetPage} />             
      <HomeStack.Screen name="Edit" component={EditPage} />
      {/* <HomeStack.Screen name="Add" component={AddPage} /> */}
      <HomeStack.Screen name="PieChart" component={PieChartPage} />
      {/* <HomeStack.Screen name="LineChart" component={LineChartPage} /> */}
   </HomeStack.Navigator>
  );
}


export default AssetStackScreen;