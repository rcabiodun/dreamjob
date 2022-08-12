import React ,{useState,useRef} from "react";
import { View,Text,StyleSheet,StatusBar, Modal, TouchableOpacity, TextInput,TouchableWithoutFeedback,Keyboard,SectionList,FlatList,Animated, Image} from 'react-native';
import { useEffect } from 'react';
import * as securestore from 'expo-secure-store';
import { FontAwesome,Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import ListItem from "../components/ListItem";
import {Picker} from "@react-native-picker/picker";
import VendorList from "../components/VendorList";



export default  function SearchScreen({route,navigation}){
    const animatedvalue = useRef(new Animated.Value(0)).current;
    const [index,setindex]=useState(0)
    const [query,setquery]=useState('')
    const [selectedValue, setSelectedValue] = useState("Food");
    const translation = useRef(new Animated.Value(-100)).current;
  
    const animation=(toValue)=> Animated.timing(animatedvalue,{
        toValue,
        duration:900,
        useNativeDriver:false
    })    
    function onPress(){
        console.log(`staring ${index}`)
        setindex(index===1 ? 0 : 1)
        animation(index===1 ? 0 : 1).start()
        console.log(`Ending ${index}`)
        console.log(selectedValue) 
        navigation.navigate('SearchResultScreen', {
            query:query,
            choice:selectedValue,
          })

        

    }
    function animate(){
        console.log(`staring ${index}`)
        setindex(index===1 ? 0 : 1)
        animation(index===1 ? 0 : 1).start()
        console.log(`Ending ${index}`)
        

    }
    useEffect(animate,[query])
    // retreive foodn items
    const containerBG=animatedvalue.interpolate({
        inputRange:[0,0.001,0.5,0.501,1],
        outputRange:['#fff','#fff','#fff','#ff7f50','#ff7f50',]
})
    const searchBG=animatedvalue.interpolate({
    inputRange:[0,0.001,0.5,0.501,1],
    outputRange:['#ff7f50','#ff7f50','#ff7f50','#fff','#fff']
    })
    return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
        
      <Animated.View style={[styles.container,{backgroundColor:containerBG}]}>
            <View style={{alignItems:"center",}}>
                    <TextInput placeholder={'Search...'} style={styles.textinp} onChangeText={setquery}/>
                    <View style={{flexDirection:"row",marginBottom:100,}}>
                        <TouchableOpacity onPress={()=>setSelectedValue('Food')} style={{width:70,height:50,borderRadius:15,marginRight:10,backgroundColor:selectedValue==="Food"? index===0 ? '#ff7f50' : '#fff':index===0 ? '#fff' : '#ff7f50',alignItems:"center",justifyContent:"center"}}>
                            <MaterialCommunityIcons name="food-fork-drink" size={24} color={index===1 ? '#ff7f50':'#fff'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> setSelectedValue('Vendor')}  style={{width:70,height:50,borderRadius:15,marginLeft:10,backgroundColor:selectedValue==="Vendor"? index===0 ? '#ff7f50' :'#fff': index===0 ? '#fff' : '#ff7f50',alignItems:"center",justifyContent:"center"}}>
                            <MaterialCommunityIcons name="home-roof" size={24} color={index===1 ? '#ff7f50':'#fff'} />
                        </TouchableOpacity>
                    </View>
                     
                    
                        <Animated.View style={[styles.search,
                            {backgroundColor:searchBG,
                                
                            transform:[
                                {
                                    perspective:400
                                },
                                {
                                    rotateY :animatedvalue.interpolate({
                                        inputRange:[0,0.5,1],
                                        outputRange:['0deg','-90deg','-180deg']
                                })
                                },
                                {   scale:animatedvalue.interpolate({
                                        inputRange:[0,0.5,1],
                                        outputRange:[1,8,1]
                                })
                                },
                                
                                ]}]}>
                            <TouchableOpacity  onPress={()=>onPress()} >
                                <View style={[styles.search,styles.searchBtn]}>
                                <Ionicons name="search-sharp" size={24} color={index===1 ? '#ff7f50':'#fff'} />

                                </View>        
                            </TouchableOpacity>
                    
                        </Animated.View>

            </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};



const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor:'#fff',
      alignItems:"center",
      justifyContent:"center"

    },
    textinp:{
        width:250,
        backgroundColor:'#fff',
        paddingVertical:8,
        paddingHorizontal:8,
        borderRadius:15,
        borderColor:'#E2BB20',
        borderWidth:0.5,
        elevation:1,
        marginBottom:15,
        
      },
    search:{
        backgroundColor:'#ff7f50',
        width:90,
        height:90,
        borderRadius:45,
      },
    searchBtn:{
        backgroundColor:'transparent',
        justifyContent:'center',
        alignItems:'center',

    }  

});
  