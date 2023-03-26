
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStackScreen from './HomeStackScreen';
import AnalysisScreen from './AnalysisScreen';
import SettingsScreen from './SettingScreen';

import colors from '../config/colors';

import store from '../store/configureStore';
import { accountAdded } from '../store/account';


store.dispatch(accountAdded({name: "Richart",value: 7000, type: 'bank'}));
store.dispatch(accountAdded({name: "富邦",value: 423000, type: 'bank'}));
store.dispatch(accountAdded({name: "台積電",amount:150, unitValue:580, type: 'stock'}));
store.dispatch(accountAdded({name: "華南金",amount:1000, unitValue:22.1, type: 'stock'}));
store.dispatch(accountAdded({name: "台中銀",amount:1000, unitValue:13.8, type: 'stock'}));
store.dispatch(accountAdded({name: "開發金",amount:2000, unitValue:12.4, type: 'stock'}));
store.dispatch(accountAdded({name: "兆豐金",amount:2000, unitValue:33.1, type: 'stock'}));
store.dispatch(accountAdded({name: "永豐大戶",value: 504000, type: 'bank'}));
store.dispatch(accountAdded({name: "聯邦銀行",value: 100000, type: 'bank'}));
store.dispatch(accountAdded({name: "LineBank",value: 50000, type: 'bank'}));


//MainScreen中有用到Tab
const Tab = createBottomTabNavigator();


export default function MainScreen() {
  return (
    <Tab.Navigator initialRouteName="Home" 
    //tabBarHideOnKeyboard: true 鍵盤出現自動隱藏
    screenOptions={{tabBarActiveTintColor: colors._1, tabBarStyle:{ display: "flex"}, tabBarHideOnKeyboard: true}}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Analysis"
        component={AnalysisScreen}
        options={{
          tabBarLabel: 'Analysis',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-pie" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}