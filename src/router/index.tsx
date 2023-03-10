import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNav from './bottomtabnav';

const Stack = createStackNavigator();

const Router = () => {

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen component={BottomTabNav} name="HomeTab" />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;