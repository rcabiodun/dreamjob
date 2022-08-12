import React from 'react';
import { StyleSheet, Text, View, StatusBar,TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from '../screens/Home';
import ItemListScreen from '../screens/itemList'
import CartScreen from '../screens/cart';
import ItemDetailScreen from '../screens/itemDetail';

const Stack=createNativeStackNavigator()

export default function HomeStack(){
    return(
    <Stack.Navigator>

        <Stack.Screen options={{headerShown: false}} name={'homepage'} component={Homescreen}/>
        <Stack.Screen options={{headerShown: false}} name={'itemList'} component={ItemListScreen}/>
        <Stack.Screen options={{headerShown: false}} name={'itemDetail'} component={ItemDetailScreen}/>
        <Stack.Screen options={{headerShown: false}} name={'cart'} component={CartScreen}/>
    </Stack.Navigator>
    )

}