import React ,{useState,useRef} from "react";
import { View,Text,StyleSheet,StatusBar, Modal, TouchableOpacity, TextInput,SectionList,FlatList,Animated, Image,Switch} from 'react-native';
import { useEffect } from 'react';
import * as securestore from 'expo-secure-store';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import ListItem from "../components/ListItem";
import Message from "../components/toast";
import { MotiView } from "@motify/components";
import { Easing } from "react-native-reanimated";
import VendorList from "../components/VendorList";
import LottieView from 'lottie-react-native';


export default  function Vendorscreen({route,navigation}){
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
              fetch('https://eathub-go.herokuapp.com/vendor/vendorList/',requestOptions).then(response=>response.json()).then(result=> {
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
              fetch('https://eathub-go.herokuapp.com/vendor/vendorList/',requestOptions).then(response=>response.json()).then(result=> {
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
              fetch('https://eathub-go.herokuapp.com/vendor/vendorList/',requestOptions).then(response=>response.json()).then(result=> {
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
          fetch('https://eathub-go.herokuapp.com/vendor/vendorList/',requestOptions).then(response=>response.json()).then(result=> {
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
        fetch('https://eathub-go.herokuapp.com/vendor/vendorList/',requestOptions).then(response=>response.json()).then(result=> {
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
    
   
    
    return (
      
      <View style={styles.container}>
        
        <View style={[styles.header,{marginTop:10}]}>
          <View
          >
          </View>
          <TouchableOpacity style={[styles.continue,styles.center]}  onPress={()=>{navigation.navigate('Homestack', {screen:'cart'})}}>
            
          <Ionicons name="cart" size={20} color={"#fff"} />
          
          </TouchableOpacity>

        </View>
        <View style={styles.subheader}>
        
        <View >
          <MotiView 
             
            style={styles.illustration}>
           

            
            <LottieView source={require('../assets/woman-cooking.json')}
            autoPlay={true}
            loop={true}
            style={{width:'40%',aspectRatio:1}}
        ></LottieView>
            <View >
              <Text style={{color:'#fff'}} >
                All your favourites 
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
          </MotiView>
        </View>
          
      </View>
        <AnimatedSectionList
          contentContainerStyle={{paddingHorizontal:24,paddingTop:10,paddingBottom:63}}
          stickySectionHeadersEnabled={false}
          onRefresh={()=>makeInquiry()}
          refreshing={isrefreshing}
          ListFooterComponent={sectionFooter}  
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

                <Text style={{fontSize:16,fontWeight:'700',color:'grey',}}>{section.title}</Text>
                <TouchableOpacity style={{borderBottomWidth:1,borderBottomColor:'#ff7f50', justifyContent:'center',
      alignItems:'center',}} onPress={()=>{
                if(section.title==="Latest vendors"){
                  navigation.navigate('listofvendors', {
                    location:"any",
                  })
                }else if(section.title==="Vendors near you"){navigation.navigate('listofvendors', {
                  location:"same", })

                }else if(section.title==="Vendors around you"){
                  navigation.navigate('listofvendors', {
                    location:"around", })
                }  
                }}>
                  <Text style={{fontSize:13,fontWeight:'700',color:'#808080'}}>see more...</Text>

                </TouchableOpacity>
              </View>
              <FlatList
                data={section.data}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item,index})=>{
                 
                  return (
                    <TouchableOpacity  onPress={()=>{navigation.navigate('Homestack', {screen:'itemList',params:{
                      vendorName: item.vendor_name}
                      
                      
                    })}}>
                     <VendorList  item={item}  />
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
      backgroundColor:'#FAF9F6'
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
      elevation:5,
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
  