import React from 'react';
import { StyleSheet, Text, View, StatusBar,TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loginscreen from './screens/login';
import Home from './screens/Home';


const Stack=createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name={'login'} component={Loginscreen}/>
          <Stack.Screen  options={{headerShown: false}}name={'home'} component={Home}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
