import React ,{useState,useRef} from "react";
import { View,Text,StyleSheet,StatusBar, Modal, TouchableOpacity, TextInput,SectionList,FlatList,Animated, Image} from 'react-native';
import { useEffect } from 'react';
import * as securestore from 'expo-secure-store';
import { FontAwesome5,Ionicons } from '@expo/vector-icons';
import ListItem from "../components/ListItem";
import { MotiView } from "@motify/components";
import LottieView from 'lottie-react-native';
import WebView from "react-native-webview";



export default  function PaymentScreen({route,navigation}){
    const scrolling = useRef(new Animated.Value(0)).current;
    const translation = useRef(new Animated.Value(-100)).current;
    const[visible,setvisible]=useState(false)
    const[url,seturl]=useState('')
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
    
           
        
        
     
     useEffect(()=>{
          setrefresh(true)

        console.log("jumping")
        securestore.getItemAsync('details').then(token=>{
           console.log("in home screen")

            if (token){
             let userToken=JSON.parse(token)
              console.log("retreived food items")
              console.log(userToken.token)
              const requestOptions={ 
                method:'Post',
                headers:{'Content-Type': 'application/json', Authorization: `token ${userToken.token}`,},
                
              }
              console.log(userToken)
              fetch(`https://eathub-go.herokuapp.com/vendor/initiate_payment/${route.params.id}/`,requestOptions).then(response=>response.json()).then(result=> {
              //setsection(previousarr=>[...previousarr,...parsedresults])

              console.log(result)
              seturl(result.authorization_url)
              })
            
            }
          })
           



     },[])

   
    
    if(url.length<1){return (
      
      <View style={styles.container}> 
        
        <View style={{justifyContent:'center',alignItems:'center'}}>
        <LottieView source={require('../assets/payment.json')}
            autoPlay={true}
            loop={true}
            style={{width:'60%',aspectRatio:1}}
        ></LottieView>
        </View>

        
        
          
    </View>   
    
  );}else if(url.length>2){return(
    <WebView 
    style={[styles.container,{marginTop:80}]}
    source={{ uri: url }}
  />

  )

  }
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
  