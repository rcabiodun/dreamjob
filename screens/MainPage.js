import React,{useRef, useEffect} from 'react';
import { MotiView } from "@motify/components";

import { 
    Image,
    ImageBackground,
    Animated,
    Platform, 
    SafeAreaView,
    StyleSheet, 
    StatusBar, 
    View, 
    Text,
     
    TouchableOpacity } from 'react-native';


    
function MainPageScreen(props) {
    const firstOpacity = useRef(new Animated.Value(0)).current;
    const secondOpacity = useRef(new Animated.Value(0)).current;

    useEffect(()=>{Animated.stagger(150,[
        Animated.timing(firstOpacity,{
            toValue:1,
            useNativeDriver:true,
        }),
        Animated.timing(secondOpacity,{
            toValue:1,
            useNativeDriver:true,
        })
        ]).start();
    },[])

 
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("../assets/116_generated.jpg")}
            style={styles.background}
            resizeMode="cover"
            fadeDuration={2000}
             >
                <View style={styles.imglogo}>
                
                </View>
                <View style={styles.textmiddle}>
                    <Text style={styles.textitself}>get <Text style={{color:'#ff7f50'}}>food</Text> delivered to <Text style={{color:'#ff7f50'}}>your</Text> doorstep</Text>
                </View>
                <View style={styles.container}>
               
                    <MotiView 
                        from={{
                            opacity:0.5,
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
                            duration:1500,
                        }}
                        >
                        <TouchableOpacity  onPress={()=>{props.navigation.navigate('registration')}} style={styles.continue}><Text style={{color:"#fff",fontSize:15,fontWeight:"bold"}}>Sign Up</Text></TouchableOpacity>                   

                    </MotiView>
                    <MotiView 
                        from={{
                            opacity:0.5,
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
                            duration:2500,
                        }}
                        >
                        <TouchableOpacity  onPress={()=>{props.navigation.push('login')}} style={styles.login}><Text style={{color:"#FCF6F5FF", fontSize:15, fontWeight:"bold"}}>Login</Text></TouchableOpacity>

                    </MotiView>
                 </View>
                
               
            </ImageBackground>
        </SafeAreaView>
        
    ); 
}


const styles = StyleSheet.create({
    background:{
        paddingTop:Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex:1,
    },
    container:{
        flex:1,
        alignItems: "center",
        justifyContent: "flex-end",
        bottom:StatusBar.currentHeight+50,
    },
    imglogo:{
        alignItems: "center",
        padding:10,
    },
    continue:{
        width:200,
        paddingHorizontal:20,
        paddingVertical:16,
        backgroundColor:'#ff7f50',
        marginTop:8,
        alignItems:'center',
        borderRadius:100,
        elevation:2,
        
      },
      login:{
        width:200,
        paddingHorizontal:20,
        paddingVertical:16,
        backgroundColor:'transparent',
        borderColor:'#ff7f50',
        marginTop:8,
        alignItems:'center',
        borderRadius:100,
        borderWidth:2
      },
   
    register:{
        backgroundColor: "#FCF6F5FF",
        width:"70%",
        borderRadius:30,
        borderColor:"#990011FF",
        margin:10,
        height:50,
        textAlign:"center",
        alignContent:"center",
        borderWidth:1,
    },
    textitself:{
        fontSize:40,
        color:"#FCF6F5FF",
        textTransform:"uppercase",
        textAlign:"center",
        fontWeight:"bold",
        
        
    },
    textmiddle:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        margin:20,
        
    },
    
})
export default MainPageScreen;
