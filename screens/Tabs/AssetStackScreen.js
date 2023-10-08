import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/NavigationHeader';
import AssetPage from '../pages_asset/AssetPage';
import EditPage from '../pages_asset/EditPage';
import AccountPage from '../pages_asset/AccountPage';


const HomeStack = createStackNavigator();

function AssetStackScreen() {
  return(
    <HomeStack.Navigator initialRouteName="AssetPage" screenOptions={{headerShown: true}}>
      <HomeStack.Screen 
        name="AssetPage" 
        component={AssetPage}
        options={{ header: (props) => <Header iconName={"coins"}  title="資產" {...props} />}}
        />             
      <HomeStack.Screen 
        name="Edit" 
        component={EditPage}
        options={{headerTitle: "編輯"}}
        />
      <HomeStack.Screen 
        name="Account" 
        component={AccountPage}
        />
   </HomeStack.Navigator>
  );
}


export default AssetStackScreen;