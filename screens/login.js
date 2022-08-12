import React, {useState,useEffect,useRef} from 'react';
import { View,Text,StyleSheet,StatusBar ,TouchableOpacity, TextInput,TouchableWithoutFeedback,Modal,Keyboard,ActivityIndicator,ScrollView,Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-google-app-auth';
import * as securestore from 'expo-secure-store';
import {Picker} from '@react-native-picker/picker';
import LoadingIndicator from '../components/loader';
import {requestPermissionsAsync} from 'expo'
import { timing } from 'react-native-reanimated';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { FontAwesome5 } from '@expo/vector-icons';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


export default  function Loginscreen(props){
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const [emailAdd,setemail]=useState('')
    const[visible,setvisible]=useState(false)
    const[indicatorVisible,setIndicatorVisible]=useState(false)
    const [address,setaddress]=useState('')
    const [password,setpassword]=useState('')
    const [password2,setpassword2]=useState('')
    const [locations,setlocations]=useState([])

    const [message,setmessage]=useState('')

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
    
    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);
  
    //storin user using asyncstorage
    async function registerForPushNotificationsAsync() {
      let token;
      if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }
    
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    
      return token;
    }
    
    
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
 

    //conneting to my api
    function loginapi(){
      if(password){
        setIndicatorVisible(true)
        const requestOptions={
          method:'Post',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({email: emailAdd,password:password,pushToken:expoPushToken})
        }
        fetch('https://eathub-go.herokuapp.com/api/login/',requestOptions).then(response=>response.json()).then(result=> {
        if(result.message==="invalid email address" || result.message==="password is invalid"){
            console.log(result)
            setmessage("Passwords or email is incorrect")
            setvisible(true)
            setIndicatorVisible(false)
        }
        
        else{
            console.log(result)
            save(JSON.stringify(result))
        }
        
        
        })
        console.log("Registration successful")
        
      }
      else{
        setmessage("Passwords or email is incorrect")
        console.log(locations)
        setvisible(true)

      
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
        
        <ScrollView>
        
            <View style={styles.vhead}>
                <Text style={styles.vtext}>Log into</Text>
                <Text style={styles.vtext}>your account</Text>

            </View>
            
            <View style={styles.vinput}>
                <TextInput placeholder={'Email'} style={styles.textinp} onChangeText={setemail}/>
              
                <TextInput placeholder={'Password'} secureTextEntry={true} style={styles.textinp} onChangeText={setpassword}/>
          
                
                <TouchableOpacity style={styles.continue} onPress={loginapi} >
                  
                  <Text style={styles.btn} 
                  >Login</Text>
                </TouchableOpacity>
                 
                { indicatorVisible ?
                <View style={styles.indicator}>
                  <LoadingIndicator size={20}/>
                </View> : null}
                <View style={styles.FG}>
                
                <TouchableOpacity style={styles.auth} onPress={signInGoogle}>
  
                <FontAwesome5 name="google" size={24} color="#ff7f50" />
                    
                </TouchableOpacity>
                
                

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
      marginTop:65,
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
      paddingVertical:9,
      paddingHorizontal:9,
      borderRadius:15,
      elevation:1,
      marginTop:12,
      borderColor:'#E2BB20',
      borderWidth:0.5,
      marginBottom:12,
    },
    continue:{
      width:150,
      paddingHorizontal:20,
      paddingVertical:16,
      backgroundColor:'#ff7f50',
      marginTop:35,
      alignItems:'center',
      elevation:2,
      borderRadius:100
    },
    btn:{
      fontWeight:'bold',
      fontSize:15,
      color:'#fff'
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
      alignItems:'center',
      justifyContent:'center',
      marginTop:10
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
  