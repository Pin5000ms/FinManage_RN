
import { TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AssetStackScreen from './Tabs/AssetStackScreen';
import BalanceStackScreen from './Tabs/BalanceStackScreen';
import SettingsScreen from './Tabs/SettingScreen';


import colors from '../config/colors';

import store from '../store/configureStore';
import { accountAdded } from '../store/account';

import { assetHistoryAdded } from '../store/assetHistory';


store.dispatch(accountAdded({name: "Richart",value: 7000, type: 'bank'}));
store.dispatch(assetHistoryAdded({id: 0, value: 70000}));//紀錄資產歷史


store.dispatch(accountAdded({name: "台新",value: 110000, type: 'bank'}));
store.dispatch(assetHistoryAdded({id: 1, value: 110000}));//紀錄資產歷史


store.dispatch(accountAdded({name: "富邦",value: 345000, type: 'bank'}));
store.dispatch(assetHistoryAdded({id: 2, value: 345000}));//紀錄資產歷史

store.dispatch(accountAdded({name: "台積電",amount:20, unitValue:550, type: 'stock'}));
store.dispatch(assetHistoryAdded({id: 3, value: 20*550}));//紀錄資產歷史

store.dispatch(accountAdded({name: "華南金",amount:1000, unitValue:22.1, type: 'stock'}));
store.dispatch(assetHistoryAdded({id: 4, value: 1000*22.1}));//紀錄資產歷史

store.dispatch(accountAdded({name: "台中銀",amount:1000, unitValue:13.8, type: 'stock'}));
store.dispatch(assetHistoryAdded({id: 5, value: 1000*13.8}));//紀錄資產歷史

store.dispatch(accountAdded({name: "兆豐金",amount:2000, unitValue:33.1, type: 'stock'}));
store.dispatch(assetHistoryAdded({id: 6, value: 2000*33.1}));//紀錄資產歷史

store.dispatch(accountAdded({name: "永豐大戶",value: 504000, type: 'bank'}));
store.dispatch(assetHistoryAdded({id: 7, value: 504000}));//紀錄資產歷史

store.dispatch(accountAdded({name: "聯邦銀行",value: 100000, type: 'bank'}));
store.dispatch(assetHistoryAdded({id: 8, value: 100000}));//紀錄資產歷史

store.dispatch(accountAdded({name: "LineBank",value: 50000, type: 'bank'}));
store.dispatch(assetHistoryAdded({id: 9, value: 50000}));//紀錄資產歷史


import { negIncomeAdded, posIncomeAdded } from '../store/incomes';
store.dispatch(posIncomeAdded({name:"薪水", value:80000}));
store.dispatch(negIncomeAdded({name:'房租', value: 10000}));
store.dispatch(negIncomeAdded({name:'生活費', value: 10000}));
store.dispatch(negIncomeAdded({name:'學貸', value: 3000}));
store.dispatch(negIncomeAdded({name:'家用', value: 12000}));
store.dispatch(negIncomeAdded({name:'手機', value: 1000}));


//MainScreen中有用到Tab
const Tab = createBottomTabNavigator();


export default function MainScreen() {
  return (
    <Tab.Navigator initialRouteName="Home" 
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