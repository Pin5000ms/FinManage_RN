
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStackScreen from './HomeStackScreen';
import AnalysisScreen from './AnalysisScreen';
import SettingsScreen from './SettingScreen';

import colors from '../config/colors';

import store from '../redux/store';
import { accountAdded } from '../redux/actionCreator';


store.dispatch(accountAdded("Bank1",1000,'bank'));
store.dispatch(accountAdded("Bank2",1000,'other'));
store.dispatch(accountAdded("Bank3",1000,'bank'));
store.dispatch(accountAdded("Bank4",1000,'bank'));
store.dispatch(accountAdded("Bank5",1000,'bank'));
store.dispatch(accountAdded("Bank6",1000,'bank'));
store.dispatch(accountAdded("Bank7",1000,'bank'));
store.dispatch(accountAdded("Bank8",1000,'bank'));

//MainScreen中有用到Tab
const Tab = createBottomTabNavigator();


export default function MainScreen() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{tabBarActiveTintColor: colors.kurenai, tabBarStyle:{height:50}}}>
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