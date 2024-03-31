import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/NavigationHeader';
import AssetPage from '../pages_asset/Accounts/AssetPage';
import EditPage from '../pages_asset/Accounts/CRUD/EditPage';
import AccountDetailPage from '../pages_asset/AccountDetails/AccountDetailPage';
import EditRecord from '../pages_asset/AccountDetails/CRUD/Edit';


const HomeStack = createStackNavigator();

function AssetStackScreen() {
  return(
    <HomeStack.Navigator initialRouteName="AssetPage" screenOptions={{headerShown: true}}>
      <HomeStack.Screen 
        name="AssetPage" 
        component={AssetPage}
        options={ { header: (props) => <Header iconName={"coins"}  title="資產" {...props}/>} }
        />             
      <HomeStack.Screen 
        name="EditAccount" 
        component={EditPage}
        options={{headerTitle: "編輯"}}
        />
      <HomeStack.Screen 
        name="AccountDetail"
        component={AccountDetailPage}
        options={
          ({ route, navigation }) =>{
            return { header: (props) => <Header title="" showBackButton={navigation.canGoBack()} onBackPress={()=>navigation.goBack()} {...props}/>}
          }
        }
        />
      <HomeStack.Screen 
        name="EditRecord"
        component={EditRecord}
        options={{headerTitle: "紀錄編輯"}}
        />
   </HomeStack.Navigator>
  );
}


export default AssetStackScreen;