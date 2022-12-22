import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ShopingCartScreen from '../screens/ShoppingCartScreen';
import HomeStack from './homestack';
import CartStack from './cartstack';
import Entypo from 'react-native-vector-icons/Entypo';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {

  return (   
    <Tab.Navigator 
        tabBarOptions={{
            showLabel: false, 
            inactiveTintColor: '#ffbd7d',
            activeTintColor: '#e47911',
        }}>
        <Tab.Screen 
            component={HomeStack} 
            name="Home" 
            options={{
                tabBarIcon: ({color}) => (<Entypo name="home" color={color} size={25}/>),
            }}/>
        <Tab.Screen 
            component={HomeScreen} 
            name="Profile" 
            options={{
                tabBarIcon: ({color}) => (<Entypo name="user" color={color} size={25}/>),
            }}/>
        <Tab.Screen 
            component={CartStack} 
            name="Shopping Cart" 
            options={{
                tabBarIcon: ({color}) => (<Entypo name="shopping-cart" color={color} size={25}/>),
            }}/>
        <Tab.Screen 
            component={HomeScreen} 
            name="More" 
            options={{
                tabBarIcon: ({color}) => (<Entypo name="menu" color={color} size={25}/>),
            }}/>
    </Tab.Navigator>
  );
};

export default BottomTabNav;