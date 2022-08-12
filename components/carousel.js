import React ,{useState} from "react";
import { View,Text,StyleSheet,StatusBar, Modal, TouchableOpacity,Image ,TextInput,SectionList,FlatList,ImageBackground} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from 'react';
import * as securestore from 'expo-secure-store';
import { FontAwesome } from '@expo/vector-icons';


function ListItem({item}){
    return(
    <View style={{flexDirection:'row',alignItems:"center"}}>
         <Image
            style={{ borderRadius: 10,
                shadowColor: '#202020',
                shadowOffset: {width: 0, height: 0},
                shadowRadius: 5,
                width:120,
                height:160,
                
                marginTop:10,
                
                paddingHorizontal:10,
                paddingBottom:10,
              }}
            source={{uri:item.photo_url}}
        >   
            
        </Image>

        <View style={{backgroundColor:'#ff7f50',marginRight:15,height:150,width:150,justifyContent:"center"}}>
        <View>
            <Text>{item.title}</Text>
            
        </View>
            <Text>{item.price}</Text>
        </View>
    </View>
    
       
    
    
    )

}


const styles=StyleSheet.create({

    background:{
       

    },
    text:{
        color:'#fff',
        fontWeight:'bold'
    },
    continue:{
        backgroundColor:'#E2BB20',
        paddingVertical:6,
        paddingHorizontal:6,
        borderRadius:60,
        elevation:5
    },
})




let carouselData=[{
    id:1,
    picture:require('../assets/5972775.jpg'),
    message:"All your fav"
},{
    id:2,
    picture:require('../assets/4196991.jpg'),
    message:"All by just "
},{
    id:3,
    picture:require('../assets/5972775.jpg'),
    message:"Get all your "
},{
    id:5,
    picture:require('../assets/5972775.jpg'),
    message:"Get all your "
},
{
    id:4,
    picture:require('../assets/5972775.jpg'),
    message:"Get all your "
},{
    id:6,
    picture:require('../assets/5972775.jpg'),
    message:"Get all your "
}
]

export default carouselData;

