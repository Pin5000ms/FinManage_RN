
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStackScreen from './HomeStackScreen';
import AnalysisScreen from './AnalysisScreen';
import SettingsScreen from './SettingScreen';

import colors from '../config/colors';

import store from '../store/configureStore';
import { accountAdded } from '../store/account';


store.dispatch(accountAdded({name: "Bank1",value: 1000, type: 'bank'}));
store.dispatch(accountAdded({name: "Bank2",value: 1000, type: 'cash'}));
store.dispatch(accountAdded({name: "Bank3",value: 1000, type: 'stock'}));
store.dispatch(accountAdded({name: "Bank4",value: 1000, type: 'foreign'}));
store.dispatch(accountAdded({name: "Bank5",value: 1000, type: 'gold'}));
store.dispatch(accountAdded({name: "Bank6",value: 1000, type: 'digit'}));
store.dispatch(accountAdded({name: "Bank7",value: 1000, type: 'bank'}));
store.dispatch(accountAdded({name: "Bank8",value: 1000, type: 'bank'}));

//MainScreen中有用到Tab
const Tab = createBottomTabNavigator();


export default function MainScreen() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{tabBarActiveTintColor: colors._1, tabBarStyle:{height:50}}}>
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