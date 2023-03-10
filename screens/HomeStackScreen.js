import { createStackNavigator } from '@react-navigation/stack';

import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';
import AddPage from './pages/AddPage';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return(
    <HomeStack.Navigator initialRouteName="HomeStack" screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="HomeStack" component={HomePage} />             
      <HomeStack.Screen name="Edit" component={EditPage} />
      <HomeStack.Screen name="Add" component={AddPage} />
   </HomeStack.Navigator>
  );
}


export default HomeStackScreen;