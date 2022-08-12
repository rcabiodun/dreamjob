import React from 'react';
import { StyleSheet, Text, View, StatusBar,TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreen from '../screens/settings';
import Profile from '../screens/profile';


const Stack=createNativeStackNavigator()

export default function SettingStack(){
    return(
    <Stack.Navigator>

        <Stack.Screen options={{headerShown: false}} name={'Settingscreen'} component={SettingScreen}/>
        <Stack.Screen options={{headerShown: false}} name={'Profilescreen'} component={Profile}/>
        
    </Stack.Navigator>
    )

}