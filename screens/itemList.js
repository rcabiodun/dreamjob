import React ,{useState,useRef} from "react";
import { View,Text,StyleSheet,StatusBar, Modal, TouchableOpacity, TextInput,SectionList,FlatList,Animated, Image} from 'react-native';
import { useEffect } from 'react';
import * as securestore from 'expo-secure-store';
import { FontAwesome,Ionicons,Entypo,FontAwesome5 } from '@expo/vector-icons';
import Message from "../components/toast";
import { MotiView } from "@motify/components";
import Easing from "react-native/Libraries/Animated/Easing";
import LottieView from 'lottie-react-native';

export default  function ItemListScreen({route,navigation}){
    const scrolling = useRef(new Animated.Value(0)).current;
    const[visible,setvisible]=useState(false)
    const[messages,setmessages]=useState([])
    const[items,setitems]=useState([])
    const[isrefreshing,setrefresh]=useState(false)
    const[secvisible,setsecvisible]=useState(false)
    const itemSize=100+20*3
     
    const arr=[1,2]
    let counter=0
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
                method:'Get',
                headers:{'Content-Type': 'application/json', Authorization: `token ${userToken.token}`,},
                
              }
              console.log(userToken)
              fetch(`https://eathub-go.herokuapp.com/vendor/vendor_item_list/${route.params.vendorName}/`,requestOptions).then(response=>response.json()).then(result=> {
              //setsection(previousarr=>[...previousarr,...parsedresults])
                setrefresh(false)
                setitems(result)
              })
             
            }  
          })
           
        
        
     
      },[])

    function makeInquiry(){
      setrefresh(true)
      console.log("jumping")
      securestore.getItemAsync('details').then(token=>{
      console.log("in home screen")
       
        if (token){
         let userToken=JSON.parse(token)
          console.log("retreived food items")
          console.log(userToken.token)
          const requestOptions={ 
            method:'Get',
            headers:{'Content-Type': 'application/json', Authorization: `token ${userToken.token}`,},
            
          }
          console.log(userToken)
          fetch(`https://eathub-go.herokuapp.com/vendor/vendor_item_list/${route.params.vendorName}/`,requestOptions).then(response=>response.json()).then(result=> {
          //setsection(previousarr=>[...previousarr,...parsedresults])
            setrefresh(false)
            setitems(result)
          })
         
        }  
      })
       
    
    
 
  }
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
        fetch(`https://eathub-go.herokuapp.com/vendor/add_to_cart/${id}/`,requestOptions).then(response=>response.json()).then(result=> {
        //setsection(previousarr=>[...previousarr,...parsedresults])
        addMessage(title)
        console.log(result)

        
        })
      
      }
    })


  }
   function addMessage(message){
      console.log("adding function")
      setmessages(messages=>[...messages,message])
      console.log(messages)
    }
   

   
    
    return (
      
      <View style={styles.container}>
        <View style={{position:'absolute',top:45,left:0,right:0,paddingHorizontal:20}}>
          {messages.map(m =>{
            return(
              <Message 
                key={counter+1} 
                message={m}
                onHide={()=>{
                  setmessages((messages)=>messages.filter((currentMessage)=>{
                      currentMessage!==m

                    }
                  ))
                }}
              />

            )
          })}
        </View> 
         <View style={styles.header}>
          <View>
            <TouchableOpacity style={{paddingHorizontal:10,marginTop:5}}  onPress={()=> navigation.goBack()}>
              <Ionicons name="arrow-back-circle-sharp" size={35} color="#ff7f50" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.cart,styles.center]}  onPress={()=>{navigation.push('cart')}}>
            
          <Ionicons name="cart" size={20} color={"#fff"} />
          
          </TouchableOpacity>

        </View>
        
       
        <View style={styles.subheader}>
        
        <View >
          <View style={styles.illustration}>
            <LottieView source={require('../assets/online-shopping.json')}
            autoPlay={true}
            loop={true}
            style={{width:'40%',aspectRatio:1}}
        ></LottieView>
            <View >
              <Text style={{color:'#fff',fontWeight:'500',fontSize:20}} >
                {route.params.vendorName}
              </Text>
              
            </View>
            <View style={{position:'absolute',bottom:10,right:10}}>
          <TouchableOpacity style={[styles.eye,styles.center]}  onPress={()=>{navigation.push('cart')}}>
                            {arr.map((index)=>{
                                  return(
                                    <MotiView 
                                      from={{opacity:0.6, scale:1}}
                                      animate={{opacity:0, scale:2}}
                                      transition={{
                                        type:'timing',
                                        duration:2000,
                                        delay:index*400,
                                        repeatReverse: false,
                                        loop:true
                                      }}
                                      key={index} 
                                      style={[StyleSheet.absoluteFillObject,styles.eye]}
                                      

                                    />
                                  )
                                })
                                  
                              }
                              <FontAwesome5 name="eye" size={11} color='#fff' />
                            
                            
                            </TouchableOpacity>
            
          </View>
      
          </View>
        </View>
          
      </View>
      
      <Animated.FlatList 
        data={items}
        onRefresh={()=>makeInquiry()}
        refreshing={isrefreshing}
        contentContainerStyle={{paddingHorizontal:34,paddingTop:10}}
        onScroll={Animated.event(
          [{
            nativeEvent: {
              contentOffset: {
                y: scrolling,
              },
            },
          }],
          { useNativeDriver: true },
        )}
        
        renderItem={({item,index})=>{
          const inputRange=[
            -1,0,itemSize*index,itemSize*(index+2)
          ]
          const opacityInputRange=[
            -1,0,itemSize*index,itemSize*(index+0.5)
          ]
          const scale=scrolling.interpolate({
            inputRange, 
            outputRange:[1,1,1,0]
          })
          const opacity=scrolling.interpolate({
            inputRange:opacityInputRange,
            outputRange:[1,1,1,0]
          })

          return <Animated.View style={{flexDirection:'row',
              alignItems:'center',
              marginTop:8,
              paddingHorizontal:10,
              paddingVertical:7,
              marginBottom:10,
              backgroundColor:'#fff',
              elevation:3,
              justifyContent:'space-between',
              transform:[{scale}],
              opacity,
              borderRadius:10}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <TouchableOpacity onPress={()=>{ console.log(item.id);navigation.push('itemDetail',{item:item.title,id:item.id})}}>    
              <Image  source={{uri:item.photo_url
              }} style={{width:100,height:100,borderRadius:50,marginRight:15}}/>
              </TouchableOpacity>
              <View>
                <Text style={{fontWeight:'bold',fontSize:18,color:'#ff7f50',marginBottom:1}}>{item.title.toUpperCase()}</Text>
                <Text style={{fontWeight:'bold',fontSize:14,color:'#ff7f50',marginBottom:1}}>${item.price}</Text>
                <Text style={{color:'#ff7f50',color:'#808080'}}>Fee:${item.delivery_fee}</Text>
                
              </View>
            </View>
            
            <TouchableOpacity style={[styles.continue,styles.center]} onPress={()=>addToCart(item.title,item.id)}>
           
            <Ionicons name="cart" size={16} color={"#fff"} />
              </TouchableOpacity>
          </Animated.View>

        }}
      
      />
      <View style={{backgroundColor:'#ff7f50',height:0.1,marginBottom:57}}>
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
      alignItems:'center'
     
      
    },
    subheader:{
      paddingHorizontal:24,
      marginTop:20
      
      
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
      backgroundColor:'#E2BB20',
      width:30,
      height:30,
      borderRadius:60,
      
  },

   
    illustration:{
      flexDirection:'row',
      alignItems:"center",
      backgroundColor:'#ff7f50',
      borderColor:'#ff7f50',
      borderWidth:0.3,
      borderRadius:10,
      paddingHorizontal:30,
      marginBottom:6,
      marginTop:9,
      paddingVertical:10
    },
    cart:{
      backgroundColor:'#ff7f50',
      borderRadius:40,
      width:40,
      height:40
    },
    center:{
      justifyContent:'center',
      alignItems:'center',
    },
    eye:{
      backgroundColor:'#E2BB20',
      borderRadius:40,
      width:23,
      height:23
    },
    center:{
      justifyContent:'center',
      alignItems:'center',
    },
});
  