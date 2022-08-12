import React from 'react';
import { StyleSheet, Text, View, StatusBar,TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VendorList from '../components/VendorList';
import Vendorscreen from '../screens/VendorPage';
import ListOfVendorsScreen from '../screens/ListOfVendors';
import OrderHome from '../screens/ordertracker';
import PendingScreen from '../screens/pending';
import AcceptedScreen from '../screens/accepted';
import PaymentScreen from '../screens/payment';

const Stack=createNativeStackNavigator()

export default function OrderStack(){
    return(
    <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name={'OrderHome'} component={OrderHome}/>
        <Stack.Screen options={{headerShown: false}} name={'PendingScreen'} component={PendingScreen}/>
        <Stack.Screen options={{headerShown: false}} name={'AcceptedScreen'} component={AcceptedScreen}/>
        <Stack.Screen options={{headerShown: false}} name={'PaymentScreen'} component={PaymentScreen}/>
        
    </Stack.Navigator>
    )

}