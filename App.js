import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screen/home';
import Camera from './src/screen/camera';
import Detail from './src/screen/detail';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator headerMode={'none'}>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="Detail" component={Detail} />
    </MainStack.Navigator>
  );
}

export default function RootStackScreen() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="ModalCamera"
          options={{headerShown: false}}
          component={Camera}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
