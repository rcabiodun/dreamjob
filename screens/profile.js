import React, { useState,useEffect } from "react";
import { Image, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome,Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as securestore from 'expo-secure-store';
import AnimatedLottieView from "lottie-react-native";
import LottieView from 'lottie-react-native';
export default function Profile({route,navigation}){
    const[userProfile,setUserProfile]=useState({})

    useEffect(()=>{
        securestore.getItemAsync('details').then(token=>{
            if(token){
                console.log("i am here o")
                const newtoken=JSON.parse(token)
                console.log(newtoken)
                const requestMaterials={
                    method:'Get',
                    headers:{'Content-Type':'application/json',Authorization:`token ${newtoken.token}`},
                
                }
                fetch('https://eathub-go.herokuapp.com/api/profile/',requestMaterials).then((result)=>result.json()).then((result)=>{
                    console.log(result)
                    setUserProfile(result)
                })
            }
        })
    },[])
    return(
        <View style={style.container}>
            <View style={style.nav}>
                <TouchableOpacity style={{}} onPress={()=>{navigation.goBack()}}>
                <Ionicons name="arrow-back-circle-sharp" size={35} color="#ff7f50" />
                </TouchableOpacity>
            </View>
            <View style={{alignItems:'center'}} >
                <LottieView source={require('../assets/PROFILE.json')}
                autoPlay={true}
                loop={true}
                style={{width:'40%',aspectRatio:1}}></LottieView>
            </View>

        </View>
    )
}

const style=StyleSheet.create({
    container:{
        paddingTop:StatusBar.currentHeight+20,
        flex:1,
        backgroundColor:'white'
    },
    nav:{
        paddingHorizontal:20,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-between"
    }
})