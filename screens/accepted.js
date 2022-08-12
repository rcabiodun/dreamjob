import React ,{useState,useRef} from "react";
import { View,Text,StyleSheet,StatusBar, Modal, TouchableOpacity, TextInput,SectionList,FlatList,Animated, Image} from 'react-native';
import { useEffect } from 'react';
import * as securestore from 'expo-secure-store';

import { FontAwesome5,Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from "@motify/components";
import LottieView from 'lottie-react-native'



export default  function AcceptedScreen({route,navigation}){
    const[visible,setvisible]=useState(false)
    const[indicatorVisible,setIndicatorVisible]=useState(false)
    const arr=[1,2]

    const[secvisible,setsecvisible]=useState(false)
    const[user,setuser]=useState('')
    const scrolling = useRef(new Animated.Value(0)).current;
    const [modalvisible,setmodalvisible]=useState(false)
    const [modal2visible,setmodal2visible]=useState(false) 
    const[address,setaddress]=useState('')
    const[delivery_address,setdeliveryaddress]=useState('')

    const[items,setItems]=useState([])
    const[isrefreshing,setrefresh]=useState(false)
    const itemSize=100+20*3
    let takeaway

    useEffect(()=>{
      setrefresh(true)
      securestore.getItemAsync('details').then(token=>{
       
        if (token){
         let userToken=JSON.parse(token)
          console.log("retreived food items")
          console.log(userToken.token)
          const requestOptions={ 
            method:'Get',
            headers:{'Content-Type': 'application/json', Authorization: `token ${userToken.token}`,},
            
          }
          console.log(userToken)
          fetch(`https://eathub-go.herokuapp.com/vendor/accepted_items/`,requestOptions).then(response=>response.json()).then(result=> {
          //setsection(previousarr=>[...previousarr,...parsedresults])
          console.log(result)
          setrefresh(false)
          setItems(result)
          if( result===undefined){
            setItems(0)
          }else if(result.length===0){
            setItems(0)
          }
          })
         
        }  
      })
       
     
    
 
  },[])
 
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
        console.log(userToken)
        fetch(`https://eathub-go.herokuapp.com/vendor/add_to_cart/${id}/`,requestOptions).then(response=>response.json()).then(result=> {
        //setsection(previousarr=>[...previousarr,...parsedresults])  
        console.log(result)
        makeInquiry()

        })
      
      }
    })


  }
  
  function place_order(wh){
    securestore.getItemAsync('details').then(token=>{
    console.log(wh)
      if (token){
       let userToken=JSON.parse(token)
        console.log("retreived food items")
        console.log(userToken.token)
        if (wh==="pa"){
         takeaway="profile address" 
        }else if (wh==="ti"){
         if(address.length<1){
           setIndicatorVisible(true)
            return;
          }else{takeaway=address} 
        }
       
        console.log(takeaway)
        const requestOptions={ 
          method:'Post',
          headers:{'Content-Type': 'application/json', Authorization: `token ${userToken.token}`,},
          body:JSON.stringify({delivery_add:takeaway})
        }
        console.log(userToken)
        fetch(`https://eathub-go.herokuapp.com/vendor/check_out/`,requestOptions).then(response=>response.json()).then(result=> {
        //setsection(previousarr=>[...previousarr,...parsedresults])
          setIndicatorVisible(false)
          setaddress('')
          setmodalvisible(!modalvisible)
          setmodal2visible(true)
          
          
        })
      }   
    })


  }
  function sectionFooter(){ 
    if(items!==0){
    return(

    null
  )}else if(items===undefined || items===0){return(
    <View style={{alignItems:"center",marginTop:10}}>
      <TouchableOpacity  >
        <Text style={styles.appName}>Nothig to see here</Text>
        <MaterialCommunityIcons name="run-fast" size={20} color="#fff" />

        

      </TouchableOpacity>
    </View>

  )}
  }
 
  
  function makeInquiry(){
    setrefresh(true)
    setrefresh(true)
    securestore.getItemAsync('details').then(token=>{
     
      if (token){
       let userToken=JSON.parse(token)
        console.log("retreived food items")
        console.log(userToken.token)
        const requestOptions={ 
          method:'Get',
          headers:{'Content-Type': 'application/json', Authorization: `token ${userToken.token}`,},
          
        }
        console.log(userToken)
        fetch(`https://eathub-go.herokuapp.com/vendor/accepted_items/`,requestOptions).then(response=>response.json()).then(result=> {
        //setsection(previousarr=>[...previousarr,...parsedresults])
          setrefresh(false)
          setItems(result)
          if( result===undefined){
            setItems(0)
          }else if(result.length===0){
            setItems(0)
          }
        })
       
      }  
    })
  
  }

    function GoBack(){
      if(route.params.prevPage==="FirstHome"){
        console.log("going to homepage")
        navigation.goBack('homepage');}
        
      else if (route.params.prevPage==="SecondHome"){
          console.log("going to locations page")
        navigation.goBack('Location') 
      } 

    }
 

   if(items!==0){ return (
      <View style={styles.container}>
        <Modal
          transparent={true}
          visible={modalvisible}
        >
          <View style={styles.modalcontainer}>
          <MotiView 
                        from={{
                            opacity:0.9,
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
                            duration:1600,

                        }}
                 >         
            <View style={styles.modalView}>
            <TextInput placeholder={'Type in address'} style={styles.textinp}  onChangeText={setaddress}/>
              <TouchableOpacity style={{mariginTop:10}} onPress={()=>{
              
                place_order("pa")}

              } >
              <Text style={styles.appName} >or use address on profile...</Text>
              </TouchableOpacity>
               { indicatorVisible ?
                <Text style={styles.appName} >input is empty</Text>
                
                : null}
              <TouchableOpacity
                style={styles.button}
                onPress={() => {place_order("ti")}}>
                <Text style={styles.textStyle}>continue</Text>
              </TouchableOpacity>
            </View>
            </MotiView>
          </View>
        </Modal>
        <Modal
          transparent={true}
          visible={modal2visible}
        >
          <View style={styles.modalcontainer}>
          <MotiView 
                        from={{
                            opacity:0.9,
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
                            duration:1600,

                        }}
                 >         
            <View style={styles.modalView}>
              <TouchableOpacity style={{mariginTop:10}} >
              <Text style={styles.appName} >Your order has been placed</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  
                  setmodal2visible(!modal2visible)
                  
                  setTimeout(()=>{makeInquiry()},1000)
                 
                  }}>
                <Text style={styles.textStyle}>close</Text>
              </TouchableOpacity>
            </View>
            </MotiView>
          </View>
        </Modal>
       
         <TouchableOpacity style={{paddingHorizontal:10}}  onPress={()=>navigation.goBack('homepage')}>
            <Ionicons name="arrow-back-circle-sharp" size={35} color="#ff7f50" />
          </TouchableOpacity>
          <View style={{alignItems:'center',justifyContent:'center',height:60}}>
        <LottieView source={require('../assets/the-delivery-man.json')}
            autoPlay={true}
            loop={true}
            style={{width:'60%',aspectRatio:1}}
        ></LottieView>

        </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15,marginBottom:10,paddingHorizontal:15}}>
           <View style={{flexDirection:'row'}}>
            <Text style={{fontWeight:'bold',fontSize:18,marginRight:2,color:'#808080'}}> {items ? items.length : 0}</Text>
            <Text style={{fontWeight:'bold',fontSize:18,color:'#808080'}}> item(s)</Text>

            </View>
            <TouchableOpacity>
              <Text style={styles.appName}>Accepted items</Text>
            </TouchableOpacity>
          </View>
          
      <Animated.FlatList 
        data={items}
        onRefresh={()=>makeInquiry()}
        refreshing={isrefreshing}
        ListFooterComponent={sectionFooter}
        ListFooterComponentStyle={{marginBottom:80}}
        contentContainerStyle={{paddingHorizontal:25,paddingTop:10}}
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
              justifyContent:'space-between',
              paddingHorizontal:13,
              paddingVertical:13,
              marginBottom:10,
              backgroundColor:'#fff',
              elevation:3,
              transform:[{scale}],
              opacity,
              borderRadius:10}}>
            <View style={{alignItems:'center',flex:1,marginRight:20}}>    
              <Image  source={{uri:item.item.photo_url
              }} style={{width:100,height:100,borderRadius:7}}/>
              
            </View>
            <View style={{flex:2}}>
               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>    
                  <Text style={{fontWeight:'bold',fontSize:17,color:'#ff7f50'}}>{item.item.title.toUpperCase()}</Text>
                  <TouchableOpacity  >

                  </TouchableOpacity>

                </View>
             <View  style={{flexDirection:"row",justifyContent:"space-between",marginTop:10,alignItems:"center"}}>
               <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                  <Text style={{fontWeight:'bold',fontSize:16,marginRight:7,color:'#808080'}}>$ {item.total_price}</Text>
                   
                  
                  <TouchableOpacity style={[styles.continue,styles.center,{marginTop:5}]} >
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
 
              </TouchableOpacity>   
                </View>
                <TouchableOpacity style={{width:50,height:25,borderRadius:10,backgroundColor:'#E2BB20',alignItems:'center',justifyContent:'center'}} onPress={()=>{ console.log(item.id);navigation.push('PaymentScreen',{id:item.id})}}>
                  <Text style={{fontWeight:'bold',fontSize:16,color:'#fff'}}>Pay</Text>

                </TouchableOpacity>
             </View>
           </View>
          </Animated.View>

        }}
      
      />
  </View>
  )}else if (items===undefined || items===0){return(
    
    <View style={[styles.container]}>
          <TouchableOpacity style={{paddingHorizontal:10}}  onPress={()=>navigation.goBack('OrderHome')}>
            <Ionicons name="arrow-back-circle-sharp" size={35} color="#ff7f50" />
          </TouchableOpacity>
          <View style={[styles.container2,{justifyContent:'center',alignItems:'center',marginBottom:100}]}>
          <LottieView source={require('../assets/sadcart.json')}
            autoPlay={true}
            loop={true}
            style={{width:'70%',aspectRatio:1}}
        ></LottieView>
          </View>
             
      
    </View>
    


)};
};



const styles = StyleSheet.create({
    container: {
      flex: 1, 
      paddingTop:StatusBar.currentHeight+5,
      backgroundColor:'#fff'
    },
    header:{
      paddingHorizontal:20,
      paddingVertical:2,
      flexDirection:'row',
      justifyContent:"space-between",
      alignItems:'center'
      
    },
    modalcontainer:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',


  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal:20,
    width:250,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    elevation: 1,
  },
  textinp:{
    width:180,
    backgroundColor:'#fff',
    paddingVertical:7,
    paddingHorizontal:7,
    borderRadius:15,
    borderColor:'#E2BB20',
    borderWidth:0.5,
    elevation:1,
    marginTop:7,
    marginBottom:7,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
},
    appName:{
      color:'#ff7f50',
      fontWeight:'700',
      fontSize:15
    },
    btn:{
      fontWeight:'bold',
      fontSize:16,
      marginRight:4,
      color:'#fff'
    },
    button: {
      borderRadius: 20,
      backgroundColor:'#ff7f50',        
      padding: 15,
      marginTop:10,
      elevation: 2,
    },
    checkout:{
      width:150,
    
      paddingHorizontal:15,
      paddingVertical:15,
      backgroundColor:'#ff7f50',
      marginTop:8,
      justifyContent:'center',
      flexDirection:'row',
      borderRadius:75,
      elevation:2,
      alignItems:'center'
    },
    
    addBtn:{
      backgroundColor:'#E2BB20',
      paddingVertical:1,
      paddingHorizontal:1,
      width:15,
      height:15,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:20
    },
    removeBtn:{
      borderColor:'#E2BB20',
      paddingVertical:1,
      paddingHorizontal:1,
      width:23,
      height:23,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:15,
      borderWidth:2
    },
    search:{
      flexDirection:'row',
      paddingVertical:6,
      paddingHorizontal:15,
      width:270,
      backgroundColor:'#ff7f50',
      borderRadius:50,
      alignItems:'center',
      marginTop:15
 
    },
    searchText:{
      marginLeft:75,
      color:'#fff',
      fontSize:17,
      fontWeight:'normal'
      
    },
    searchContainer:{
      alignItems:'center'
    },

   

   
    illustration:{
      flexDirection:'row',
      alignItems:"center",
      elevation:10,
      backgroundColor:'#ff7f50',
      borderColor:'#ff7f50',
      borderWidth:0.3,
      borderRadius:10,
      paddingHorizontal:30,
      marginBottom:6,
      marginTop:9,
      paddingVertical:10
    },
    continue:{
      backgroundColor:'#E2BB20',
      width:10,
      height:10,
      borderRadius:60,
      
  },
  center:{
    justifyContent:'center',
    alignItems:'center',
  },

});
  