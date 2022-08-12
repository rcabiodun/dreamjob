import React ,{useState,useRef} from "react";
import { View,Text,StyleSheet,StatusBar, Modal,SafeAreaView, TouchableOpacity,ImageBackground, TextInput,TouchableWithoutFeedback,Keyboard,SectionList,FlatList,Animated, Image, ScrollView} from 'react-native';
import { useEffect } from 'react';
import * as securestore from 'expo-secure-store';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import Message from "../components/toast";
import { MotiView } from "@motify/components";
import { FontAwesome5,MaterialIcons,Entypo,Feather,MaterialCommunityIcons } from '@expo/vector-icons';
import carouselData from '../components/carousel';


export default  function ItemDetailScreen({route,navigation}){
    const animatedvalue = useRef(new Animated.Value(0)).current;
    const [index,setindex]=useState(0)
    const [vendor,setVendor]=useState({})
    const[myItem,setItem]=useState({})
    const[messages,setmessages]=useState([])
    const translation = useRef(new Animated.Value(-100)).current;
  
    const animation=(toValue)=> Animated.timing(animatedvalue,{
        toValue,
        duration:900,
        useNativeDriver:false
    })    
    const arr=[1,2]
    let counter=0 
    useEffect(()=>{

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
              fetch(`https://eathub-go.herokuapp.com/vendor/itemdetail/${route.params.id}/`,requestOptions).then(response=>response.json()).then(result=> {
              //setsection(previousarr=>[...previousarr,...parsedresults])

              setVendor(result.vendor)
              setItem(result)

            })
            
            }
          })
           
        
        
     
      },[]) 
      function addMessage(message){
        console.log("adding function")
        setmessages(messages=>[...messages,message])
        console.log(messages)
      }
      function addToCart(id){
        securestore.getItemAsync('details').then(token=>{
    
          
          if (token){
           let userToken=JSON.parse(token)
            console.log("retreived food items")
            console.log(userToken.token)
            const requestOptions={ 
              method:'Post',
              headers:{'Content-Type': 'application/json', Authorization: `token ${userToken.token}`,},
              
            }
            console.log(id)
            fetch(`https://eathub-go.herokuapp.com/vendor/add_to_cart/${id}/`,requestOptions).then(response=>response.json()).then(result=> {
            //setsection(previousarr=>[...previousarr,...parsedresults])  
            console.log(result)
            addMessage("balnc")
    
            })
          
          }
        })
    
    
      }
  
    return (
        
      <SafeAreaView style={[styles.container]}>
        <View style={{position:'absolute',top:25,left:0,right:0,paddingHorizontal:20}}>
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
      <ImageBackground
            style={styles.background}
            source={{uri:myItem.photo_url}}
            imageStyle={{ 
                shadowColor: '#202020',
                shadowOffset: {width: 0, height: 0},
                shadowRadius: 5,
                borderBottomLeftRadius:20,
                borderBottomRightRadius:20,
                resizeMode:'cover'
    
              }}
        >
        
         <View style={styles.header}>
          <View>
            <TouchableOpacity style={{paddingHorizontal:10,marginTop:5}}  onPress={()=> navigation.goBack('homepage')}>
              <Ionicons name="arrow-back-circle-sharp" size={35} color="#ff7f50" />
            </TouchableOpacity>
          </View>
          
          

        </View>
            
            
            
        </ImageBackground>  
        <View style={{
            flex:2,
        }}>
            <MotiView 
              from={{
                opacity:0.95,
                transform:[{
                  translateY:15
                }]
              }}
              animate={{
                opacity:1,
                transform:[{
                  translateY:0

                }]
                
              }}
              transition={{
                type:'timing',
                duration:1050,
              }}
              style={{
                flex:1,
                backgroundColor:'#FFF'
            }}>
                <View style={[styles.header,{marginTop:23,marginLeft:5}]}>
                    <View>
                        <View style={[{width:60,height:22,marginTop:7,backgroundColor:'#E2BB20', borderRadius:35},styles.center]}>
                            <Text style={{color:"#fff",fontSize:10,fontWeight:"bold"}}>IN STOCK</Text>
                        </View>
                    </View>
                    <View></View>

                </View>
                <View style={{paddingHorizontal:13,flexDirection:"row",justifyContent:'space-between',alignItem:'center',marginTop:10}}>
                    <View>
                        
                        <Text style={{fontWeight:'bold',fontSize:28,color:'#ff7f50'}}> {route.params.item.toUpperCase()} </Text>

                    </View>
                    <TouchableOpacity style={[styles.cart,styles.center]}  onPress={()=>{navigation.push('cart')}}>
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
                                  style={[StyleSheet.absoluteFillObject,styles.cart]}
                                  

                                />
                              )
                            })
                              
                          }
                          <FontAwesome5 name="eye" size={15} color='#fff' />
                        
                        
                        </TouchableOpacity>
                    
                </View>
                <View styles={{height:70}}>
                    <ScrollView
                    contentContainerStyle={{marginTop:20,paddingVertical:12,paddingHorizontal:13}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    > 
                    <View style={styles.center}>
                            <TouchableOpacity style={styles.details}>
                                <MaterialCommunityIcons name="home-roof" size={24} color="#ff7f50" />
                                    
                            </TouchableOpacity>
                                <Text style={styles.detailsText}>{vendor.vendor_name}  </Text>
                        </View>
                         
                        <View style={styles.center}>
                            <TouchableOpacity style={styles.details} onPress={()=>console.log(query)}>
                                <MaterialIcons name="local-shipping" size={28} color="#ff7f50" />
                            </TouchableOpacity>
                            <Text style={styles.detailsText}>${myItem.delivery_fee}</Text>
                            
                        </View>
                        <View style={styles.center}>
                            <TouchableOpacity style={styles.details}>
                                <FontAwesome5 name="shipping-fast" size={26} color="#ff7f50" />
                            </TouchableOpacity>
                            <Text style={styles.detailsText}>${myItem.different_location_fee}</Text>

                        </View>
                        <View style={styles.center}>
                            <TouchableOpacity style={styles.details}>
                                <Entypo name="location-pin" size={26} color="#ff7f50" />

                            </TouchableOpacity>
                                <Text style={styles.detailsText}>{vendor.location}  </Text>

                        </View>
                        <View style={styles.center}>
                            <TouchableOpacity style={styles.details}>
                                <FontAwesome5 name="eye" size={26} color='#ff7f50' />
                            </TouchableOpacity>
                                <Text style={styles.detailsText}>Vendor  </Text>
                        </View>
                        <View style={styles.center}>
                            <TouchableOpacity style={styles.details}>
                                <Feather name="phone-call" size={24} color="#ff7f50" />
                            </TouchableOpacity>
                                <Text style={styles.detailsText}>{vendor.phone_number}  </Text>
                        </View>
                        
                    </ScrollView>
                </View>
                <View style={{flexDirection:"row",alignItems:'center', paddingHorizontal:13}}>
                  <MotiView 
                          from={{
                              opacity:0.7,
                              transform:[{
                              translateY:5
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
                              duration:1500,
                          }}
                          >
                      <TouchableOpacity style={styles.continue} onPress={()=>addToCart(myItem.id)}>
                      
                      <Text style={styles.btn} 
                      >Add to cart</Text>
                      </TouchableOpacity>
                      </MotiView>
                    <View>
                      <MotiView 
                          from={{
                              opacity:0.3,
                              transform:[{
                              translateY:8
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
                              duration:2500,
                          }}
                          >
                        <Text style={{marginLeft:15,fontWeight:'bold',fontSize:24,color:'#ff7f50',marginTop:35}}>${myItem.price}</Text>
                        </MotiView>
                    </View>    
                </View>
            </MotiView>
        </View>
      </SafeAreaView>
  );
};



const styles = StyleSheet.create({
    container: {
      flex: 1,
       
    
    },
    details:{
        alignItems:'center',
        justifyContent:"center",
        width:55,
        elevation:3,
        height:65,
        borderRadius:10,
        marginHorizontal:10,
        backgroundColor:'#FFF'
    },
    detailsText:{fontWeight:'800'  ,fontSize:15,color:'#BFBFBF',marginTop:2},
    background:{
        flex:1,
    },
    cart:{
        backgroundColor:'#E2BB20',
        borderRadius:40,
        width:40,
        height:40
      },
      center:{
        justifyContent:'center',
        alignItems:'center',
      },
      header:{
        marginTop:StatusBar.currentHeight+5,
        paddingHorizontal:13,
      
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center'
       
        
      },
      continue:{
        width:140,
        height:50,
        justifyContent:'center',
        backgroundColor:'#ff7f50',
        marginTop:35,
        marginRight:10,
        alignItems:'center',
        elevation:2,
        borderRadius:40
      },
      btn:{
        fontWeight:'bold',
        fontSize:17,
        color:'#fff'
      },
    
});
  