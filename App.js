import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//要注意'react-native-web'和'react-native'的不同
//import { Button, SafeAreaView } from 'react-native-web';
import React, { useState } from 'react';



import HomeStackScreen from './screens/HomeStackScreen';
import AnalysisScreen from './screens/AnalysisScreen';
import SettingsScreen from './screens/SettingScreen';


import color from './config/colors';


import store from './redux/store';
import { accountAdded } from './redux/actionCreator';


store.dispatch(accountAdded("Bank1",1000));
store.dispatch(accountAdded("Bank2",1000));
store.dispatch(accountAdded("Bank3",1000));
store.dispatch(accountAdded("Bank4",1000));
store.dispatch(accountAdded("Bank5",1000));
store.dispatch(accountAdded("Bank6",1000));
store.dispatch(accountAdded("Bank7",1000));
store.dispatch(accountAdded("Bank8",1000));



const getIsSignedIn = () => {
  // custom logic
  return true;
};

//MainScreen中有用到Tab
const Tab = createBottomTabNavigator();


function MainScreen() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{tabBarActiveTintColor: color.kurenai, tabBarStyle:{height:50}}}>
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


function LogInScreen() {
  return <View/>;
}

function SignUpScreen() {
  return <View />;
}


const Stack = createStackNavigator();

//Navigation外層要有個Container
//每個Tab.Screen有不同的名字跟對應的頁面元件
export default function App() {
  const isSignedIn = getIsSignedIn();
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
        {
        isSignedIn ?
        (<>
          <Stack.Screen name="Main" component={MainScreen}/>
        </>)
         :
        (<>
          <Stack.Screen name="LogIn" component={LogInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>)
        }
        </Stack.Navigator>
      </NavigationContainer>
  );
}



