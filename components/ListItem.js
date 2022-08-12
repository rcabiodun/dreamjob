import React ,{useState} from "react";
import { View,Text,StyleSheet,StatusBar, Modal, TouchableOpacity, TextInput,SectionList,FlatList,ImageBackground} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from 'react';
import * as securestore from 'expo-secure-store';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import { MotiView } from "@motify/components";
import Easing from "react-native/Libraries/Animated/Easing";

export default function ListItem({func,item}){
    const arr=[1,2]
      function addToCart(title,id){
        securestore.getItemAsync('details').then(token=>{
    
          
          if (token){
           let userToken=JSON.parse(token)
            console.log("retreived food items")
            console.log(userToken.token)
            const requestOptions={ 
              method:'Post',
              headers:{'Content-Type': 'application/json', Authorization: `token ${userToken.token}`,},
              
            }
            console.log(userToken)
            fetch(`https://eathub-cli.herokuapp.com/vendor/add_to_cart/${id}/`,requestOptions).then(response=>response.json()).then(result=> {
            //setsection(previousarr=>[...previousarr,...parsedresults])
            console.log(result)
            func(title)
            
            })
          
          }
        })
    
    
      }
    return(
      <View>
        <ImageBackground
            style={styles.background}
            source={{uri:item.photo_url
            }}
            imageStyle={{ borderRadius: 10,
                shadowColor: '#202020',
                shadowOffset: {width: 0, height: 0},
                shadowRadius: 5,
              }}
            blurRadius={0.5}
        >
            <View>
                <Text style={styles.title}>
                    {item.title}
                </Text>
                <Text style={styles.subTitile}>
                    ${item.price}
                </Text>
                <Text style={{color:'#fff',fontWeight:'bold',fontSize:13}}>
                   fee: ${item.delivery_fee}
                </Text>
            </View>
            <TouchableOpacity style={[styles.continue,styles.center]} onPress={()=>addToCart(item.title,item.id)}>
                {arr.map((index)=>{
                    return(
                      <MotiView 
                        from={{opacity:0.7, scale:1}}
                        animate={{opacity:0, scale:1.7}}
                        transition={{
                          type:'timing',
                          duration:2000,
                          delay:index*400,
                          
                          repeatReverse: false,
                          loop:true
                        }}
                        key={index} 
                        style={[StyleSheet.absoluteFillObject,styles.continue]}
                        

                      />
                    )
                  })
                    
                }
            <Ionicons name="cart" size={16} color={"#fff"} />

              </TouchableOpacity>

            
        </ImageBackground>
      </View>
    )

}


const styles=StyleSheet.create({

    background:{
        width:130,
        height:170,
        marginRight:15,
        marginTop:10,
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'space-between',
        paddingHorizontal:10,
        paddingBottom:10,

    },
    title:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:18,
    },
    subTitile:{
        color:'#fff',
        fontWeight:'bold',
    },
    
    continue:{
      backgroundColor:'#E2BB20',
      width:30,
      height:30,
      borderRadius:60,
      
  },
  center:{
    justifyContent:'center',
    alignItems:'center',
  },
})

