import React from 'react';
import { StyleSheet, Text, View, StatusBar,TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screens/search';
import SearchResultScreen from '../screens/searchresults';


const Stack=createNativeStackNavigator()

export default function SearchStack(){
    return(
    <Stack.Navigator>

        <Stack.Screen options={{headerShown: false}} name={'search'} component={SearchScreen}/>
        <Stack.Screen options={{headerShown: false}} name={'SearchResultScreen'} component={SearchResultScreen}/>
        
    </Stack.Navigator>
    )

}