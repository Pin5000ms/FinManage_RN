import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/NavigationHeader';
import AssetPage from '../pages_asset/Accounts/AssetPage';
import EditPage from '../pages_asset/Accounts/CRUD/EditPage';
import AccountDetailPage from '../pages_asset/AccountDetails/AccountDetailPage';


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
        name="AccountDetail"
        component={AccountDetailPage}
        options={({ route, navigation }) => ({
          header: (props) => (
            <Header title="" showBackButton={navigation.canGoBack()} onBackPress={()=>navigation.goBack()} {...props} />
          ),
        })}
        />
   </HomeStack.Navigator>
  );
}


export default AssetStackScreen;