
import { View, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import AssetStackScreen from './Tabs/AssetStackScreen';
import AnalysisStackScreen from './Tabs/AnalysisStackScreen';
import BalanceStackScreen from './Tabs/BalanceStackScreen';
import SettingsScreen from './Tabs/SettingScreen';


import colors from '../config/colors';

import store from '../store/configureStore';

import {generateUniqueID, AddAccount} from './components/Utility';

AddAccount(generateUniqueID(), "Richart", 50000, 'bank')
AddAccount(generateUniqueID(), "富邦", 330000, 'bank')
AddAccount(generateUniqueID(), "永豐大戶", 500000, 'bank')
AddAccount(generateUniqueID(), "聯邦銀行", 100000, 'bank')
AddAccount(generateUniqueID(), "LineBank", 50000, 'bank')
AddAccount(generateUniqueID(), "合作金庫", 130000, 'bank')
AddAccount(generateUniqueID(), "國泰", 92000, 'bank')

AddAccount(generateUniqueID(), "台積電", 110*525, 'stock', 110, 525, )
AddAccount(generateUniqueID(), "華南金", 2000*22.1, 'stock', 2000, 22.1)
AddAccount(generateUniqueID(), "台中銀", 1000*13.8, 'stock', 1000, 13.8)
AddAccount(generateUniqueID(), "兆豐金", 1000*33.1, 'stock', 1000, 33.1)



import { negIncomeAdded, posIncomeAdded } from '../store/incomes';
import AddPage from './pages_asset/AddPage';


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