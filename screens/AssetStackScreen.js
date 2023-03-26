import { createStackNavigator } from '@react-navigation/stack';

import AssetPage from './pages/AssetPage';
import EditPage from './pages/EditPage';
import AddPage from './pages/AddPage';

const HomeStack = createStackNavigator();

function AssetStackScreen() {
  return(
    <HomeStack.Navigator initialRouteName="AssetStack" screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="AssetStack" component={AssetPage} />             
      <HomeStack.Screen name="Edit" component={EditPage} />
      <HomeStack.Screen name="Add" component={AddPage} />
   </HomeStack.Navigator>
  );
}


export default AssetStackScreen;