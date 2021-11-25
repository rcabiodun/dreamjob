import React ,{useState} from "react";
import { View,Text,StyleSheet,StatusBar, Modal, TouchableOpacity, TextInput, Image} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from 'react';


export default  function Home(){
    const[visible,setvisible]=useState(false)
    const[secvisible,setsecvisible]=useState(false)
    const[user,setuser]=useState('')

    useEffect(async()=>{
      try{
        const storedUser= await AsyncStorage.getItem('User')
        console.log("changed screen")  
        
        if(storedUser !== null){
          console.log("gotten user")  

          setuser(JSON.parse(storedUser))
          console.log(user)
      }
      }catch(error){
        console.log("an error ocured")
      }
    },[])
    return (
        <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        >
        <View style={styles.modalcontainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Email:{user.email}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setvisible(!visible)}>
              <Text style={styles.textStyle}>close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
      animationType='fade'
      transparent={true}
      visible={secvisible}>
          <View style={styles.modalcontainer}>
              <View style={styles.modalView}>
                  <Text> Enter name: </Text>
                  <TextInput placeholder={'enter'} style={styles.input}></TextInput>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setsecvisible(!secvisible)}>
                    <Text style={styles.textStyle}>Enter</Text>
                    </TouchableOpacity>
              </View>

          </View>

      </Modal>
      <Image source={{ 
        width:100,
        height:100,
        
        uri:`${user.picture}`,
        
        }}/>  
      <TouchableOpacity style={styles.button} onPress={() => setvisible(true)}>
        <Text style={styles.textStyle}>See User details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setsecvisible(true)}>
        <Text style={styles.textStyle}>Enter something</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems:"center", 
      paddingTop:StatusBar.currentHeight+5,
      backgroundColor:'#DBD2ED'
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
      backgroundColor:'#AC8BED',        
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
    input:{
        marginTop:8,
        width:150,
        paddingHorizontal:30,
        paddingVertical:5,
        backgroundColor:'#fff',
        borderColor:'#DBD2ED',
        borderWidth:1,
        borderRadius:20,
        elevation:3
    },

    imageContainer:{
      paddingBottom:20
    }
});
  