import React from 'react';
import { StyleSheet, Text, View, StatusBar,TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VendorList from '../components/VendorList';
import Vendorscreen from '../screens/VendorPage';
import ListOfVendorsScreen from '../screens/ListOfVendors';

const Stack=createNativeStackNavigator()

export default function VendorStack(){
    return(
    <Stack.Navigator>

        <Stack.Screen options={{headerShown: false}} name={'vendorpage'} component={Vendorscreen}/>
        <Stack.Screen options={{headerShown: false}} name={'listofvendors'} component={ListOfVendorsScreen}/>
        
    </Stack.Navigator>
    )

}