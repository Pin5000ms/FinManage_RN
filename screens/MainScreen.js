
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
import {AddAccount, generateUniqueID, generateUniqueItemId, getCurrentTimeStamp} from './components/Utility';
import { accountHistoryAdded, accountHistoryDeleted} from '../store/accountHistory';
import { negIncomeAdded, posIncomeAdded } from '../store/incomes';


// const myArray = {
//   1:{ id: 1, description: "Item 1" },
//   2:{ id: 2, description: "Item 2" },
//   3:{ id: 3, description: "Item 3" }
// };
// console.log(myArray[1])

AddAccount(generateUniqueID(), "Richart", 'bank')
AddAccount(generateUniqueID(), "國泰證券", 'stock')
AddAccount(generateUniqueID(), "聯邦銀行", 'bank')
AddAccount(generateUniqueID(), "永豐大戶", 'bank')
AddAccount(generateUniqueID(), "LineBank", 'bank')
AddAccount(generateUniqueID(), "華南證券", 'stock')
AddAccount(generateUniqueID(), "合作金庫", 'bank')


const stamp = getCurrentTimeStamp();

console.log(stamp)

const newItem = {accountId:0, itemId: generateUniqueItemId(0), itemName:"萬用罐", itemVal: 600000, type:'bank', timeStamp: '2023/5/1'} ;
store.dispatch(accountHistoryAdded(newItem))
const newItem2 = {accountId:0, itemId: generateUniqueItemId(0), itemName:"日幣", itemVal: 32000, type:'bank', timeStamp: '2023/5/1'} ;
store.dispatch(accountHistoryAdded(newItem2))
const newItem3 = {accountId:0, itemId: generateUniqueItemId(0), itemName:"活存", itemVal: 15000, type:'bank', timeStamp: '2023/5/1'} ;
store.dispatch(accountHistoryAdded(newItem3))

 
const newItem4 = {accountId:1, itemId: generateUniqueItemId(1), itemName:"台塑", unitVal: 69, amount:1000, type:'stock', timeStamp: stamp} ;
store.dispatch(accountHistoryAdded(newItem4))
const newItem5 = {accountId:1, itemId: generateUniqueItemId(1), itemName:"合庫金", unitVal: 25, amount:2000, type:'stock', timeStamp: stamp} ;
store.dispatch(accountHistoryAdded(newItem5))

const newItem6 = {accountId:2, itemId: generateUniqueItemId(2), itemName:"活存", itemVal: 100000, type:'bank', timeStamp: stamp} ;
store.dispatch(accountHistoryAdded(newItem6))

const newItem7 = {accountId:3, itemId: generateUniqueItemId(3), itemName:"活存", itemVal: 500000, type:'bank', timeStamp: stamp} ;
store.dispatch(accountHistoryAdded(newItem7))

const newItem8 = {accountId:4, itemId: generateUniqueItemId(4), itemName:"活存", itemVal: 50000, type:'bank', timeStamp: stamp} ;
store.dispatch(accountHistoryAdded(newItem8))

const newItem9 = {accountId:5, itemId: generateUniqueItemId(5), itemName:"兆豐金", unitVal: 40, type:'stock', amount:1000, timeStamp: stamp} ;
store.dispatch(accountHistoryAdded(newItem9))

const newItem10 = {accountId:5, itemId: generateUniqueItemId(5), itemName:"華南金", unitVal: 23, type:'stock', amount:1000, timeStamp: stamp} ;
store.dispatch(accountHistoryAdded(newItem10))

const newItem11 = {accountId:5, itemId: generateUniqueItemId(5), itemName:"台中銀", unitVal: 17, type:'stock', amount:1000, timeStamp: stamp} ;
store.dispatch(accountHistoryAdded(newItem11))



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