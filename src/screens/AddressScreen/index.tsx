import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import countryList from 'country-list';
import Button from '../../components/Button';
import styles from './styles';

const countries = countryList.getData();
const UsaStates = require('usa-states').UsaStates;

const AddressScreen = () => {

    const usStates = new UsaStates();
    const statesNames = usStates.arrayOf('names');

    const [country, setCountry] = useState(countries[0].code);
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [addressError, setAddressError] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    const onCheckOut = () => {
        if (!fullName){
            Alert.alert('Warning!','Full name is required.');
            return;
        }

        if (!!addressError) {
            Alert.alert('Warning!',addressError);
            return;
        }

        console.warn('Checkout');
    }

    const validateAddress = () => {
        if (address.length < 3){
            setAddressError('Invalid Address!');
        }
    }
    
  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={50}
    >
        <ScrollView style={styles.root}>
        <View style={styles.row}>
            <Text style={styles.label}>Country</Text>
            <Picker
                selectedValue={country}
                onValueChange={setCountry}                
            >
                {countries.map(country => <Picker.Item label={country.name} value={country.code} />)}               
            </Picker>
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Full Name (First and Last Name)</Text>
            <TextInput 
                style={styles.input}
                placeholder='Full Name'
                value={fullName}
                onChangeText={setFullName}
            />
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput 
                style={styles.input}
                placeholder='Phone Number'
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType={'phone-pad'}
            />
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Address</Text>
            <TextInput 
                style={styles.input}
                placeholder='Address'
                value={address}
                onEndEditing={validateAddress}
                onChangeText={(text) => {
                    setAddress(text); 
                    setAddressError('');
                }}
            />
            {!!addressError && <Text style={styles.errorLabel}>{addressError}</Text>}
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>City</Text>
            <TextInput 
                style={styles.input}
                placeholder='City'
                value={city}
                onChangeText={setCity}
            />
        </View>
        <View style={styles.row}>
        <Text style={styles.label}>State</Text>
            <Picker
                selectedValue={state}
                onValueChange={setState}
            >
                {statesNames.map(state => <Picker.Item label={state} value={state} />)}               
            </Picker>
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Zip</Text>
            <TextInput 
                style={styles.input}
                placeholder='Zip'
                value={zip}
                onChangeText={setZip}
                keyboardType={'number-pad'}
            />
        </View>
        <Button text='Checkout' onPress={onCheckOut} />
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddressScreen;