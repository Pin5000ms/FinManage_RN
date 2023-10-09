import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import {  MenuProvider} from 'react-native-popup-menu';

//要注意'react-native-web'和'react-native'的不同
//import { Button, SafeAreaView } from 'react-native-web';
import React from 'react';
import MainScreen from './screens/MainScreen';



const getIsSignedIn = () => {
  // custom logic
  return true;
};

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
      <MenuProvider>
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
      </MenuProvider>
      
  );
}



