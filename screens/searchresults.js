import React ,{useState,useRef} from "react";
import { View,Text,StyleSheet,StatusBar, Modal, TouchableOpacity, TextInput,SectionList,FlatList,Animated, Image} from 'react-native';
import { useEffect } from 'react';
import * as securestore from 'expo-secure-store';
import { FontAwesome5,Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import LoadingIndicator from "../components/loader";
import VendorList from "../components/VendorList";


export default  function SearchResultScreen({route,navigation}){
    const[currentPage,setcurrentPage]=useState(1)
    const[user,setuser]=useState('')
    const scrolling = useRef(new Animated.Value(0)).current;
    const[items,setItems]=useState([])
    const[isrefreshing,setrefresh]=useState(false)
    const itemSize=100+30*3

    
    
      
    useEffect(()=>{
        securestore.getItemAsync('details').then(token=>{
       
            if (token){
             let userToken=JSON.parse(token)
              console.log("retreived food items")
              console.log(userToken.token)
              const requestOptions={ 
                method:'Post',
                headers:{'Content-Type': 'application/json', Authorization: `token ${userToken.token}`,},
                body: JSON.stringify({search:route.params.query})
                
              }
              console.log(userToken)
              if(route.params.choice==="Food"){
                fetch(`https://eathub-go.herokuapp.com/vendor/search/`,requestOptions).then(response=>response.json()).then(result=> {
                    //setsection(previousarr=>[...previousarr,...parsedresults])
                      console.log('below is the paginated result mehn')
                      console.log(result)
                      
                       setItems(result)
                        
                      
                    })
              }else if(route.params.choice==="Vendor"){
                fetch(`https://eathub-go.herokuapp.com/vendor/search_by_vendor/`,requestOptions).then(response=>response.json()).then(result=> {
                    //setsection(previousarr=>[...previousarr,...parsedresults])
                      console.log('below is the paginated result mehn')
                      console.log(result)
                      
                      setItems(result)
                        
                      
                    })  
              }
             
             
            }  
          })},[]
    )
 
  
  
 
  function sectionFooter(){ return(
    <View style={{alignItems:"center",marginTop:10,justifyContent:"center"}}>
        <LoadingIndicator size={20}/>
    </View>
  )
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
          method:'Post',
          headers:{'Content-Type': 'application/json', Authorization: `token ${userToken.token}`,},
          
        }
        console.log(userToken)
        if(route.params.choice==="Food"){
            fetch(`https://eathub-go.herokuapp.com/vendor/search/`,requestOptions).then(response=>response.json()).then(result=> {
                //setsection(previousarr=>[...previousarr,...parsedresults])
                  console.log('below is the paginated result mehn')
                  console.log(result)
                  
                   setItems(result)
                    
                  
                })
          }else if(route.params.choice==="Vendor"){
            fetch(`https://eathub-go.herokuapp.com/vendor/search_by_vendor/`,requestOptions).then(response=>response.json()).then(result=> {
                //setsection(previousarr=>[...previousarr,...parsedresults])
                  console.log('below is the paginated result mehn')
                  console.log(result)
                  
                  setItems(result)
                    
                  
                })  
          }
       
      }  
    })
  
  }
 

    return (
      <View style={styles.container}>
         <TouchableOpacity style={{paddingHorizontal:10}}  onPress={()=>navigation.goBack('homepage')}>
            <Ionicons name="arrow-back-circle-sharp" size={35} color="#ff7f50" />
          </TouchableOpacity>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15,marginBottom:10,paddingHorizontal:15}}>
           <View style={{flexDirection:'row'}}>
            <Text style={{fontWeight:'bold',fontSize:18,marginRight:2,color:'#808080'}}> {items ? items.length : 0}</Text>
            <Text style={{fontWeight:'bold',fontSize:18,color:'#808080'}}> {route.params.choice==="Vendor"? "vendor(s)" : "item(s)" }</Text>

            </View>
            <TouchableOpacity>
              <Text style={styles.appName}>Your result(s)</Text>
            </TouchableOpacity>
          </View>
      <Animated.FlatList 
        data={items}
        onRefresh={()=>makeInquiry()}
        refreshing={isrefreshing}
        ListFooterComponent={sectionFooter}
        ListFooterComponentStyle={{marginBottom:80}}
        contentContainerStyle={{paddingHorizontal:25,paddingTop:10,alignContent:'center',justifyContent:'center'}}
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
              justifyContent:'center',
              marginTop:10,
             

              transform:[{scale}],
              opacity,
              borderRadius:10}}>
                <TouchableOpacity onPress={()=>{
                    if(route.params.choice==='Vendor'){
                    navigation.navigate('Homestack', {screen:'itemList',params:{
                      vendorName: item.vendor_name}
                      
                    })}else if(route.params.choice==='Food'){
                        navigation.navigate('Homestack', {screen:'itemDetail',params:{
                            item:item.title,id:item.id
                            }
                            
                          }) 
                    }
                    
                    }}>
                  <VendorList item={item}/>
                </TouchableOpacity>
          </Animated.View>

        }}
      
      />
  </View>
  );
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
      width:23,
      height:23,
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
    }

});
  