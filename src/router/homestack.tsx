import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductScreen from '../screens/ProductScreen';
import HomeScreen from '../screens/HomeScreen';
import { Text, SafeAreaView, View, TextInput } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const Stack = createStackNavigator();

interface HeaderComponentProps {
  searchValue: string, 
  setSearchValue: () => void;
}

const HeaderComponent = ({searchValue, setSearchValue}: HeaderComponentProps) => {
  return (
    <SafeAreaView style={{backgroundColor: '#22e3dd'}}>
      <View style={{
        flexDirection: 'row',
          borderWidth: 1,
          borderColor: 'lightgrey',
          borderRadius: 5,
          margin: 10,
          backgroundColor: 'white',
          padding: 5,
          alignItems: 'center',
        }}>
        <EvilIcons name='search' size={30} />
      <TextInput 
        style={{
          height: 40,
          marginLeft: 5,
        }}
        placeholder='Search'
        value={searchValue}
        onChangeText={setSearchValue}
      />
      </View>   
    </SafeAreaView>  
  );
};

const HomeStack = () => {

  const [searchValue, setSearchValue] = useState('');

  return (
      <Stack.Navigator screenOptions={{
      header: () => <HeaderComponent searchValue={searchValue} setSearchValue={setSearchValue}/>
      }}>
        <Stack.Screen name="Home">
          {() => <HomeScreen searchValue={searchValue} />}
        </Stack.Screen>
        <Stack.Screen component={ProductScreen} name="Product Details" />
    </Stack.Navigator>
  );
};

export default HomeStack;