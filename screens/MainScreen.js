
import { View, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AssetStackScreen from './Tabs/AssetStackScreen';
import BalanceStackScreen from './Tabs/BalanceStackScreen';
import AddPage from './pages_asset/Accounts/CRUD/AddPage';
import AnalysisStackScreen from './Tabs/AnalysisStackScreen';
import SettingsScreen from './Tabs/SettingScreen';

import colors from '../config/colors';
import store from '../store/configureStore';
import {AddAccount, generateUniqueID} from './components/Utility';
import { accountHistoryAdded, accountHistoryDeleted} from '../store/accountHistory';
import { negIncomeAdded, posIncomeAdded } from '../store/incomes';


// const myArray = {
//   1:{ id: 1, description: "Item 1" },
//   2:{ id: 2, description: "Item 2" },
//   3:{ id: 3, description: "Item 3" }
// };
// console.log(myArray[1])

AddAccount(generateUniqueID(), "RichBank", 'bank')
AddAccount(generateUniqueID(), "TreeBank", 'bank')
AddAccount(generateUniqueID(), "UnionBank", 'bank')

var date = new Date();
var datestr = date.getFullYear()+ '/' + (date.getMonth()+1) + '/' + date.getDate();
const stamp = datestr + '-' + date.toTimeString()

const newItem = {accountId:0, itemId: 0, itemName:"飲料", itemVal: 100, timeStamp: stamp} ;
const newItem2 = {accountId:0, itemId: 1, itemName:"零食", itemVal: 100, timeStamp: stamp} ;
const newItem3 = {accountId:1, itemId: 0, itemName:"薪水", itemVal: 80000, timeStamp: stamp} ;
const newItem4 = {accountId:1, itemId: 1, itemName:"手機費", itemVal: 500, timeStamp: stamp} ;
store.dispatch(accountHistoryAdded(newItem))
store.dispatch(accountHistoryAdded(newItem2))
store.dispatch(accountHistoryAdded(newItem3))
store.dispatch(accountHistoryAdded(newItem4))
//store.dispatch(accountHistoryDeleted(newItem4))




store.dispatch(posIncomeAdded({name:"薪水", value:80000}));
store.dispatch(negIncomeAdded({name:'房租', value: 10500}));
store.dispatch(negIncomeAdded({name:'生活費', value: 10000}));
store.dispatch(negIncomeAdded({name:'學貸', value: 3000}));
store.dispatch(negIncomeAdded({name:'家用', value: 10000}));
store.dispatch(negIncomeAdded({name:'手機', value: 1000}));


//MainScreen中有用到Tab
const Tab = createBottomTabNavigator();


export default function MainScreen() {
  return (
    <Tab.Navigator initialRouteName="Asset" 
    //tabBarHideOnKeyboard: true 鍵盤出現自動隱藏
    screenOptions={{
      tabBarActiveTintColor: colors._1,
       tabBarStyle:{ display: "flex"},
        tabBarHideOnKeyboard: true,
        //上方Header
        headerShown: false
        }}>
      <Tab.Screen
        name="Asset"
        component={AssetStackScreen}
        options={{
          tabBarLabel: 'Asset',
          tabBarIcon: ({ color, size }) => (
            <Icon name="coins" color={color} size={size} />),
          headerTitle :'資產'
        }}
      />
      <Tab.Screen
        name="Balance"
        component={BalanceStackScreen}
        options={{
          tabBarLabel: 'Balance',
          tabBarIcon: ({ color, size }) => (
            <Icon name="table" color={color} size={size} />),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddPage}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                position: 'absolute',
                borderColor: color,
                borderWidth: 2,
                bottom: -5, // space from bottombar
                height: 60,
                width: 60,
                borderRadius: 60,
                backgroundColor: colors._2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name = "plus" color ={color} size={30}/>
            </View>
              
            ),
        }}
      />
      <Tab.Screen
        name="Analysis"
        component={AnalysisStackScreen}
        options={{
          tabBarLabel: 'Analysis',
          tabBarIcon: ({ color, size }) => (
            <Icon name="chart-line" color={color} size={size} />),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user-alt" color={color} size={size} />),
        }}
      />
    </Tab.Navigator>
  );


}