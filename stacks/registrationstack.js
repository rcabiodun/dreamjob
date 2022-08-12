import React from 'react';
import { StyleSheet, Text, View, StatusBar,TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registrationscreen from '../screens/registration';
import Loginscreen from '../screens/login';
import MainPageScreen from '../screens/MainPage';

const Stack=createNativeStackNavigator()

export default function RegistrationStack(){
    return(
    <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name={'welcomepage'} component={MainPageScreen}/>
        <Stack.Screen options={{headerShown: false}} name={'registration'} component={Registrationscreen}/>
        <Stack.Screen options={{headerShown: false}} name={'login'} component={Loginscreen}/>
    </Stack.Navigator>
    )

}