import React, {useState,useEffect} from 'react';
import { View,Text,StyleSheet,StatusBar ,TouchableOpacity, TextInput,TouchableWithoutFeedback,Keyboard,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-google-app-auth';

export default  function Loginscreen(props){
    const [emailAdd,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [password2,setpassword2]=useState('')
    const [message,setmessage]=useState('')
    const [visible,setvisible]=useState(false)

    function emailHandler(text){
      setemail(text)
    }
    function passwordHandler(text){
      setpassword(text)
    }
    function password2Handler(text){
      setpassword2(text)
    }
  
    //storin user using asyncstorage
    const mystore=(result)=>{
      try{
        console.log("storing...")
        AsyncStorage.setItem('User',JSON.stringify(result)).then(()=>{console.log("wait o");props.navigation.replace('home')})
        
      }catch(error){
        console.log(error)
      }

    }
    //connecting to google
    async function signInGoogle(){
      setvisible(true)
      try{
        let result=await Google.logInAsync({
          androidClientId:'972944938854-r84qck7gtqftsc8ndv7gk2snvljoekc0.apps.googleusercontent.com',
          iosClientId:'972944938854-rpo58ucff35954uj39314p70bbamub4b.apps.googleusercontent.com',
          scopes:['profile','email']

        })
        if (result.type='success'){
          console.log(result.user)
          loginMyApiGoogle(result.user)

        }
        else console.log("canceled")


    }catch(e){
      console.log(e)
    }
  }

  //connnecting to my api using google
  function loginMyApiGoogle(user){
      const requestOptions={
        method:'Post',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({email:user.email ,password:'peaklane',fullname:user.photoUrl })
      }
      fetch('https://eriolu.herokuapp.com/api/',requestOptions).then(response=>response.json()).then(result=> mystore(result))
      console.log("Registration successful")
      
    }








    //conneting to my api
    function loginapi(){
      if(password2==password && password.length >=8){
        setvisible(true)
        const requestOptions={
          method:'Post',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({email: emailAdd,password:password})
        }
        fetch('https://eriolu.herokuapp.com/api/',requestOptions).then(response=>response.json()).then(result=> mystore(result))
        console.log("Registration successful")
        
      }
      else{
        setmessage("Passwords don't match / is not equal or greater than 8 ")
      
      }


    }
    
    //for skipping to homepage when logged in 
    useEffect(async()=>{
      try{
        const storedUser= await AsyncStorage.getItem('User')
        
        if(storedUser !== null){
          props.navigation.navigate('home')
      }
      }catch(error){
        console.log("an error ocured")
      }
    },[])
    
    const store= async(result)=>{
      await AsyncStorage.setItem('User',result)

    }

    return(
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
        <View style={styles.container}>
              <View style={styles.arrow}>
                <TouchableOpacity style={styles.arrowbutton}>
  
                  <Text>-</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.vhead}>
                <Text style={styles.vtext}>Create</Text>
                <Text style={styles.vtext}>an account</Text>
                <Text style={styles.subtext}>Fill the details & create your account</Text>

            </View>
            <View style={styles.vinput}>
                <TextInput placeholder={'Email'} style={styles.textinp} onChangeText={setemail}/>
              
                <TextInput placeholder={'Password'} secureTextEntry={true} style={styles.textinp} onChangeText={setpassword}/>
                <TextInput placeholder={'Confirm password'} secureTextEntry={true} onChangeText={setpassword2} style={styles.textinp}/>
                {message ? <Text style={styles.subtext}>{message}</Text> : null }
                <TouchableOpacity style={styles.continue} onPress={loginapi}>
                  
                  <Text style={styles.btn} 
                  >Continue</Text>
                </TouchableOpacity>
                <View style={styles.FG}>
                
                <TouchableOpacity style={styles.auth} onPress={signInGoogle}>
  
                    <Text style={styles.tauth}>G</Text>
                </TouchableOpacity>
                

                </View>
                {visible ?
                <View style={styles.indicator}>
                  <ActivityIndicator size="large" color="#fff" />
                </View> : null}
            </View>
      </View>
    </TouchableWithoutFeedback>   

    )

} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop:StatusBar.currentHeight+20,
      backgroundColor:'#DBD2ED',
  
  
    },
    arrow:{
      paddingHorizontal:10,
      paddingVertical:20,
    },
    arrowbutton:{
      width:40,
      height:40,
      borderRadius:20,
      backgroundColor:'#fff',
      justifyContent:'center',
      alignItems:'center',
      shadowColor:'red',
      elevation:5,
  
    },
    vhead:{
      paddingHorizontal:45,
      paddingVertical:30,
      marginTop:10
  
    },
    vtext:{
      fontWeight:'bold',
      fontSize:25,
  
    },
    vinput:{
    alignItems:'center'
    },
    textinp:{
      width:250,
      backgroundColor:'#fff',
      paddingVertical:7,
      paddingHorizontal:7,
      borderRadius:15,
      elevation:7,
      marginTop:5,
      marginBottom:5,
    },
    continue:{
      width:250,
      paddingHorizontal:20,
      paddingVertical:20,
      backgroundColor:'#AC8BED',
      marginTop:27,
      alignItems:'center',
      opacity:0.7,
      borderRadius:10
    },
    btn:{
      fontWeight:'700',
      fontSize:15
    },
  
    FG:{
      flexDirection:'row',
      justifyContent:'space-around',
      padding:7,
    },
    auth:{
      width:40,
      height:40,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#fff',
      margin:20,
      borderRadius:20,
      elevation:5
    },
    tauth:{
      fontWeight:'bold'
  
    },
    
    indicator:{
      alignItems:'center'
    }
    
  
  });
  