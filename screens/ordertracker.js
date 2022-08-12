import React ,{useState,useRef} from "react";
import { View,Text,StyleSheet,StatusBar, Modal, TouchableOpacity, TextInput,SectionList,FlatList,Animated, Image} from 'react-native';
import { useEffect } from 'react';
import * as securestore from 'expo-secure-store';
import { FontAwesome5,Ionicons } from '@expo/vector-icons';
import ListItem from "../components/ListItem";
import { MotiView } from "@motify/components";
import LottieView from 'lottie-react-native';




export default  function OrderHome({route,navigation}){
    const scrolling = useRef(new Animated.Value(0)).current;
    const translation = useRef(new Animated.Value(-100)).current;
    const[visible,setvisible]=useState(false)
    const[secvisible,setsecvisible]=useState(false)
    const[isrefreshing,setrefresh]=useState(false)
    const[sections,setsection]=useState([])
    const translate = scrolling.interpolate({
      inputRange: [100, 130],
      outputRange: [0, -100],
      extrapolate: 'clamp',
    });
    const opacity=scrolling.interpolate({
      inputRange:[100,130],
      outputRange:[1,0]
    }) 
    
    let counter=0
    const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
    // retreive foodn items
    
           
        
        
     
     
    function sectionFooter(){ return(
      <View style={{alignItems:"center",marginTop:10}}>
        <TouchableOpacity style={styles.seeVendorsBtn}>
          <Text style={{color:'#fff'}}>See more vendors...</Text>

        </TouchableOpacity>
      </View>
    )
    }
   
    
    return (
      
      <View style={styles.container}> 
        
        
        <View style={{justifyContent:'center',alignItems:'center'}}>
        <LottieView source={require('../assets/walking.json')}
            autoPlay={true}
            loop={true}
            style={{width:'40%',aspectRatio:1}}
        ></LottieView>
        </View>

        
        <View style={styles.subheader}>
                <MotiView 
                        from={{
                            opacity:0,
                            transform:[{
                            translateY:0
                            }]
                        }}
                        animate={{
                            opacity:1,
                            transform:[{
                            translateY:15

                            }]
                            
                        }}
                        transition={{
                            type:'timing',
                            duration:2000,
                            loop:true,

                        }}
                 >         
                    <TouchableOpacity style={{height:40,borderBottomWidth:1,borderBottomColor:'#ff7f50'}} onPress={()=>{navigation.push('PendingScreen')}}>
                      <View style={{flexDirection:'row',alignContent:'center'}}>
                        <Ionicons name="ios-stopwatch-outline" size={24} color="#ff7f50" />
                        <Text style={{marginLeft:10,fontWeight:'bold',fontSize:18,color:'#808080'}}>Pending order</Text>
                      </View>
                    </TouchableOpacity>
                  </MotiView>
                  <MotiView 
                        from={{
                            opacity:0,
                            transform:[{
                            translateY:0
                            }]
                        }}
                        animate={{
                            opacity:1,
                            transform:[{
                            translateY:15

                            }]
                            
                        }}
                        transition={{
                            type:'timing',
                            duration:2300,
                            
                            loop:true
                        }}
                        >
                  <TouchableOpacity style={{height:40,borderBottomWidth:1,borderBottomColor:'#ff7f50',flexDirection:'row',alignContent:'center',marginTop:10}} onPress={()=>{navigation.push('AcceptedScreen')}}>
                    <View style={{flexDirection:'row',alignContent:'center'}}>
                    <Ionicons name="checkmark-circle-outline" size={24} color="#ff7f50" />
                    <Text style={{marginLeft:10,fontWeight:'bold',fontSize:18,color:'#808080'}}>Accepted orders</Text>
                    </View>
                  </TouchableOpacity>
            </MotiView>
        
          
       </View>
    </View>   
    
  );
};



const styles = StyleSheet.create({
    container: {
      flex: 1, 
      paddingTop:StatusBar.currentHeight,
      backgroundColor:'#fff'
    },
    header:{
      top: 0,
      left: 0,
      right: 0,
      paddingHorizontal:8,
    
      flexDirection:'row',
      justifyContent:"space-between",
      alignItems:'center',
      marginTop:10     
      
    },
    subheader:{
      paddingHorizontal:22,
      
      
    },
    appName:{
      color:'#ff7f50',
      fontWeight:'bold',
      fontSize:20
    },
    subText:{
      fontWeight:'bold',
      fontSize:25,
      color:'black',
      marginRight:5
    },
    subTextmini:{
      fontWeight:'100',
      fontSize:25,
      color:'black'
    },
    
    continue:{
      backgroundColor:'#ff7f50',
      borderRadius:40,
      width:40,
      height:40
    },
    center:{
      justifyContent:'center',
      alignItems:'center',
    },
    seeMoreBtn:{
      backgroundColor:'#ff7f50',
      paddingVertical:5,
      paddingHorizontal:8,
      marginRight:4,
      borderRadius:60,
      elevation:5,
      justifyContent:'center',
      alignItems:'center',
    },
    seeVendorsBtn:{
      backgroundColor:'#ff7f50',
      paddingVertical:8,
      paddingHorizontal:8,
      marginRight:4,
      borderRadius:60,
      elevation:5,
      justifyContent:'center',
      alignItems:'center',
    },
    search:{
      flexDirection:'row',
      paddingVertical:6,
      paddingHorizontal:15,
      width:270,
      backgroundColor:'#ff7f50',
      borderRadius:50,
      alignItems:'center',
      elevation:5
 
    },
    searchText:{
      marginLeft:75,
      color:'#fff',
      fontSize:17,
      fontWeight:'normal'
      
    },
    searchContainer:{
      alignItems:'center',
      justifyContent:'center',
      marginTop:5,
      marginBottom:10
    },
    illustration:{
      flexDirection:'row',
      alignItems:"center",
      elevation:10,
      backgroundColor:'#ff7f50',
      borderColor:'#ff7f50',
      borderWidth:0.3,
      borderRadius:10,
      justifyContent:'space-around',
      marginBottom:6,
      marginTop:9,
      paddingVertical:10
    }

    
});
  