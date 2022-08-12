import React, {useState,useRef,useEffect} from 'react';
import { View,Text,StyleSheet,StatusBar,Animated,Modal ,TouchableOpacity, TextInput,TouchableWithoutFeedback,Keyboard,ActivityIndicator,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-google-app-auth';
import {Picker} from '@react-native-picker/picker';
import * as securestore from 'expo-secure-store';
import { FontAwesome5 } from '@expo/vector-icons';



export default  function Registrationscreen(props){
    const [emailAdd,setemail]=useState('')
    const [fullname,setfullname]=useState('')
    const [phonenumber,setphonenumber]=useState('')
    const [address,setaddress]=useState('')
    const [password,setpassword]=useState('')
    const [password2,setpassword2]=useState('')
    const [locations,setlocations]=useState([])
    const [selectedValue, setSelectedValue] = useState("Location");
    const[indicatorVisible,setIndicatorVisible]=useState(false)
    const [message,setmessage]=useState('')
    const [visible,setvisible]=useState(false)
    const firstOpacity = useRef(new Animated.Value(0)).current;
    const secondOpacity = useRef(new Animated.Value(0)).current;

    useEffect(()=>{Animated.stagger(9000,[
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


    let tracker=0

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
    function save(value) {
      securestore.setItemAsync('details', value).then(response=>{console.log("wait o");props.navigation.replace('main')} );
    }
   

    //connecting to google
    async function signInGoogle(){
      setIndicatorVisible(true)
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

   

  useEffect(()=>{
    const requestOptions={
      method:'Get',
      headers:{'Content-Type': 'application/json'},
      
    }
    fetch('https://eathub-go.herokuapp.com/vendor/location/',requestOptions).then(response=>response.json()).then(result=> setlocations(result))
    console.log("Retrieved locations")
    },[])






    //conneting to my api
    function loginapi(){
      if(password2==password && password.length >=8){
        setIndicatorVisible(true)
        const requestOptions={
          method:'Post',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({email: emailAdd,password:password,fullname:fullname,address:address,phone_number:phonenumber,location:selectedValue})
        }
        fetch('https://eathub-go.herokuapp.com/api/',requestOptions).then(response=>response.json()).then(result=> save(JSON.stringify(result)))
        console.log("Registration successful")
        
      }
      else{
        setmessage("Passwords don't match / is not equal or greater than 8 ")
        setvisible(true)
        console.log(locations)

      
      }


    }
    
    //for skipping to homepage when logged in 

    return(
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
        
        <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
        >
          <View style={styles.modalcontainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{message}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setvisible(!visible)}>
                <Text style={styles.textStyle}>close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
           
        <ScrollView showsVerticalScrollIndicator={false}>

        
            <View style={styles.vhead}>
                <Text style={styles.vtext}>Create</Text>
                <Text style={styles.vtext}>an account</Text>
                <Text style={styles.subtext}>Fill the details & create your account</Text>

            </View>
            
            <View style={styles.vinput}>
                <TextInput placeholder={'Email'} style={styles.textinp} onChangeText={setemail}/>
                <TextInput placeholder={'Fullname'} style={styles.textinp} onChangeText={setfullname}/>
                <TextInput placeholder={'Phone number'} style={styles.textinp} onChangeText={setphonenumber}/>
                <TextInput placeholder={'address'}  style={styles.textinp} onChangeText={setaddress}/>
                <TextInput placeholder={'Password'} secureTextEntry={true} style={styles.textinp} onChangeText={setpassword}/>
                <TextInput placeholder={'Confirm password'} secureTextEntry={true} onChangeText={setpassword2} style={styles.textinp}/>
                
                <Picker
                  selectedValue={selectedValue}
                  style={{ height: 50, width: 150 }}
                  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                  {locations.map((val,i) => {
                  
                     return <Picker.Item  key={val.id} label={val.name} value={val.id} />
                    
                  })}
                  
                </Picker>

                
                <View style={{alignItems:'center'}}>
                <Animated.View style={{opacity:firstOpacity}}>
                  <TouchableOpacity style={styles.continue} onPress={loginapi}>
                    
                    <Text style={styles.btn} 
                    >Continue</Text>
                  </TouchableOpacity>
                </Animated.View>
                <Text style={styles.btn,{marginTop:5}}>or</Text>
                  <Animated.View style={{opacity:firstOpacity}}>
                    <TouchableOpacity style={styles.auth} onPress={signInGoogle}>
    
                    <FontAwesome5 name="google" size={24} color="#ff7f50" />
    
                    </TouchableOpacity>
                  </Animated.View>
               
                </View>
                {indicatorVisible ?
                <View style={styles.indicator}>
                  <ActivityIndicator size="large" color="#ff7f50" />
                </View> : null}
                <View style={styles.FG}>
                
                
                
                

                </View>
                
            </View>
     </ScrollView>
      
      </View>
    </TouchableWithoutFeedback>   

    )

} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop:StatusBar.currentHeight+20,
  
  
    },
    arrow:{
      paddingHorizontal:30,
      paddingVertical:5,
    },
    arrowbutton:{
      width:80,
      paddingHorizontal:20,
      paddingVertical:13,
      borderRadius:10,
      backgroundColor:'#ff7f50',
      justifyContent:'center',
      alignItems:'center',
      shadowColor:'red',
      elevation:5,
  
    },
    vhead:{
      paddingHorizontal:45,
      paddingVertical:30,
      marginTop:23,
      marginBottom:20
  
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
      borderColor:'#E2BB20',
      borderWidth:0.5,
      elevation:1,
      marginTop:7,
      marginBottom:7,
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
      backgroundColor:'#fff',
      borderColor:'#ff7f50',
      marginTop:8,
      alignItems:'center',
      borderRadius:100,
      borderWidth:2
    },
    btn:{
      fontWeight:'bold',
      fontSize:15,
      color:'#fff'
    },
    loginText:{
      fontWeight:'bold',
      fontSize:15,
      color:'#ff7f50'
    },

  
    FG:{
      flexDirection:'row',
      justifyContent:'space-around',
      padding:7,
    },
    auth:{
      width:45,
      height:45,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#fff',
      margin:20,
      borderRadius:45,
      elevation:5
    },
    tauth:{
      fontWeight:'bold',
      color:'#fff'
  
    },
    
    indicator:{
      alignItems:'center'
    },
    modalcontainer:{
      flex:1,
      alignItems:'center',
      justifyContent:'center'


  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width:200,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  button: {
      borderRadius: 20,
      backgroundColor:'#ff7f50',        
      padding: 19,
      marginTop:8,
      elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalText: {
        marginBottom: 15,
    },
  
  
  });
  