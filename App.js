import React from 'react';
import { StyleSheet, Text, View, StatusBar,TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loginscreen from './screens/registration';
import Home from './screens/Home';
import RegistrationStack from './stacks/registrationstack';
import MainStack from './stacks/mainstack';

const Stack=createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name={'registrationstack'} component={RegistrationStack}/>
          <Stack.Screen  options={{headerShown: false}}name={'main'} component={MainStack}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
