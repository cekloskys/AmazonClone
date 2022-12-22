import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ShopingCartScreen from '../screens/ShoppingCartScreen';
import AddressScreen from '../screens/AddressScreen';

const Stack = createStackNavigator();

const CartStack = () => {

  return (
    <Stack.Navigator>
        <Stack.Screen component={ShopingCartScreen} name="Shopping Cart" />
        <Stack.Screen component={AddressScreen} name="Address" />
    </Stack.Navigator>
  );
};

export default CartStack;