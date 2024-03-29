import React ,{useState,useRef} from "react";
import { View,Text,StyleSheet,StatusBar, Modal, TouchableOpacity, TextInput,SectionList,FlatList,Animated, Image,Switch} from 'react-native';
import { useEffect } from 'react';
import * as securestore from 'expo-secure-store';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import ListItem from "../components/ListItem";
import Message from "../components/toast";
import { MotiView } from "@motify/components";
import { Easing } from "react-native-reanimated";
import LottieView from 'lottie-react-native';


export default  function Homescreen({route,navigation}){
    const scrolling = useRef(new Animated.Value(0)).current;
    const translation = useRef(new Animated.Value(-100)).current;
    const[messages,setmessages]=useState([])
    const[secvisible,setsecvisible]=useState(false)
    const[isrefreshing,setrefresh]=useState(false)
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const[sections,setsection]=useState([])
    const arr=[1,2]
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
                method:'Get',
                headers:{'Content-Type': 'application/json', Authorization: `token ${userToken.token}`,},
                
              }
              console.log(userToken)
              fetch('https://eathub-go.herokuapp.com/vendor/marketplace/',requestOptions).then(response=>response.json()).then(result=> {
              //setsection(previousarr=>[...previousarr,...parsedresults])

              setsection(JSON.parse(result))
              setrefresh(false)
              })
            
            }
          })
           
        
        
     
      },[])

      useEffect(()=>{
        if(isEnabled){
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
              fetch('https://eathub-go.herokuapp.com/vendor/marketplace/other_locations',requestOptions).then(response=>response.json()).then(result=> {
              //setsection(previousarr=>[...previousarr,...parsedresults])

              setsection(JSON.parse(result))
              setrefresh(false)
              })
            
            }
          })


        }
        else{
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
              fetch('https://eathub-go.herokuapp.com/vendor/marketplace/',requestOptions).then(response=>response.json()).then(result=> {
              //setsection(previousarr=>[...previousarr,...parsedresults])

              setsection(JSON.parse(result))
              setrefresh(false)
              })
            
            }
          })
           
        }  
        
     
      },[isEnabled])  
  function makeInquiry(){
    if(isEnabled){
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
          fetch('https://eathub-go.herokuapp.com/vendor/marketplace/other_locations',requestOptions).then(response=>response.json()).then(result=> {
          //setsection(previousarr=>[...previousarr,...parsedresults])

          setsection(JSON.parse(result))
          setrefresh(false)
          })
        
        }
      })


    }

    else{
      setrefresh(true)
      console.log("refreshing")
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
        fetch('https://eathub-go.herokuapp.com/vendor/marketplace/',requestOptions).then(response=>response.json()).then(result=> {
        //setsection(previousarr=>[...previousarr,...parsedresults])

        setsection(JSON.parse(result))
        setrefresh(false)
        })
      
      }
    })
  }
}    
    function sectionFooter(){ return(
      <View style={{alignItems:"center",marginTop:10}}>
        <TouchableOpacity style={styles.seeVendorsBtn}>
          <Text style={{color:'#fff'}}>See more vendors...</Text>

        </TouchableOpacity>
      </View>
    )
    }
    function addMessage(message){
      console.log("adding function")
      setmessages(messages=>[...messages,message])
      console.log(messages)
    }
   
    
    return (
      
      <View style={styles.container}>
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
        <View style={styles.header}>
          <View
          >
          <Image style={{width:80,height:80}} source={require("../assets/eathub.jpg")}/>
          </View>
          <TouchableOpacity style={[styles.continue,styles.center]}  onPress={()=>{navigation.push('cart')}}>
            
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
              <Text style={{color:'#fff'}} >
                All your favourites vend
              </Text>
              <Text style={{color:'#fff',fontWeight:'500',fontSize:20}} >
                in one place.
              </Text>
            </View>
            <View style={{position:'absolute',bottom:5,right:5}}>
              <Switch
                trackColor={{ false: '#767577', true: '#fff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
        </View>
          
      </View>
        <AnimatedSectionList
          contentContainerStyle={{paddingHorizontal:24,paddingTop:10,paddingBottom:63}}
          stickySectionHeadersEnabled={false}
          onRefresh={()=>makeInquiry()}
          refreshing={isrefreshing}
          showsVerticalScrollIndicator={false}
          sections={sections}
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
          
          renderSectionHeader={({ section })=>

            <View style={{marginTop:15}}>
               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:"center"}}>

                <Text style={{fontSize:16,fontWeight:'700',color:'#808080',}}>{section.title}</Text>
                <TouchableOpacity style={{borderBottomWidth:1,borderBottomColor:'#ff7f50', justifyContent:'center',
      alignItems:'center',}} onPress={()=>{navigation.push('itemList', {
            vendorName: section.title,
            
            
          })}}>
                  <Text style={{fontSize:13,fontWeight:'700',color:'#808080'}}>see more...</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={section.data}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item,index})=>{
                 
                  return (
                    <TouchableOpacity onPress={()=>{ console.log(item.id);navigation.push('itemDetail',{item:item.title,id:item.id})}}>
                     <ListItem  func={addMessage} item={item}  />
                    </TouchableOpacity>
                  )}}
                />
            </View>
            }
          renderItem={({item,section})=>{
              return null
              return <ListItem item={item}  />
            }}
        
        />
        
       
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
      backgroundColor:'#ff7f50',
      borderColor:'#ff7f50',
      borderWidth:0.3,
      borderRadius:10,
      justifyContent:'space-around',
      marginBottom:6,
      marginTop:9,
      paddingVertical:10,
     
    },
    illustrationtwo:{
      flexDirection:'row',
      alignItems:"center",
      backgroundColor:'#ff7f50',
      borderColor:'#ff7f50',
      borderWidth:0.3,
      borderRadius:10,
      justifyContent:'space-around',
      marginBottom:6,
      marginTop:9,
      paddingVertical:10,
     
    }

    
});
  