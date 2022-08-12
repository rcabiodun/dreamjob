import React from 'react';
import { View,Text,StyleSheet,StatusBar, Modal, TouchableOpacity, TextInput, Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homescreen from '../screens/Home';
import { Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import HomeStack from './homestack';
import SearchScreen from '../screens/search';
import CartScreen from '../screens/cart';
import VendorStack from './vendorstack';
import SearchStack from './searchstack';
import OrderStack from './orderstack';
import SettingStack from './settingstack';
const Tab=createBottomTabNavigator()

export default function MainStack(){
    return(
        <Tab.Navigator
          
          screenOptions={({ route }) => ({
            tabBarStyle:{
                position:'absolute',
                bottom:7,
                left:20,
                right:20,
                elevation:3,
                backgroundColor:'#fff',
              
                borderRadius:15,
                
                height:50,
              }
            ,
            tabBarShowLabel:false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Homestack') {
                iconName = focused
                  ? 'home-sharp'
                  : 'home-outline';
              } else if (route.name === 'Searchstack') {
                iconName = focused ? 'search-sharp' : 'search-outline';
              } else if (route.name === 'Orderstack') {
                iconName = focused ? 'ios-basket' : 'ios-basket-outline';
              }else if (route.name === 'Vendorstack') {
                iconName = focused ? 'fast-food' : 'fast-food-outline';
              }else if (route.name === 'Settingstack') {
                iconName = focused ? 'ios-settings-sharp' : 'ios-settings-outline';
              }
  
              // You can return any component that you like here!
              return (<Ionicons name={iconName} size={size} color={color} />);
            },
            tabBarActiveTintColor: '#ff7f50',
            tabBarInactiveTintColor: '#E2BB20',
          })}
        >
          <Tab.Screen name="Homestack" component={HomeStack} options={{headerShown: false}} />
          <Tab.Screen name="Vendorstack" component={VendorStack} options={{headerShown: false}} />
          <Tab.Screen name="Orderstack" component={OrderStack} options={{headerShown: false}} />
          <Tab.Screen name="Searchstack" component={SearchStack} options={{headerShown: false}} />
          <Tab.Screen name="Settingstack" component={SettingStack} options={{headerShown: false}} />

        </Tab.Navigator>
    )

}


const styles= StyleSheet.create({
  shadow:{
    shadowColor:'#7F5DF0',
    shadowOffset:{
      width:0,
      height:10,
    },
    shadowOpacity:0.25,
    shadowRadius:3.5
  }

})