import {View,TextInput,Text,Button,StyleSheet,AsyncStorage,Alert} from 'react-native'
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth_tool ,db ,app} from '../firebase-config';
//import { getDatabase ,ref } from "firebase/database"
import { getFirestore , collection ,getDocs,getDoc,onSnapshot} from "firebase/firestore";


//function that fetch all documents in school_events collection


const auth = async (id,password) => {
    //console.log(getDocs(collection(getFirestore(),'school_events')));
    try{
        const userdata = await signInWithEmailAndPassword(auth_tool,id,password)
        //if id and password is not null
        //console.log(userdata.user.email)
        AsyncStorage.setItem('student_id',userdata.user.email);
        //console.log(213)
        return true;
    } catch(error){
        //console.log(error)
        Alert.alert(
            "Error",
            "Wrong Password or Email",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
        return false;
    }
}

//register page
export default function RegisLogin(prop){
    const [id,setId] = useState('');
    const [password,setPassword] = useState('');
    

    const Nav = useNavigation();
    return(
        <View style = {styles.container}>
            <Text>Student ID</Text>
            <TextInput onChange = {id => {
                setId(id.nativeEvent.text);
            }} placeholder='your Student ID'></TextInput>
            <Text>Passcode</Text>
            <TextInput onChange={
                password => {
                    setPassword(password.nativeEvent.text);
                }
            } placeholder='your Student Passcode' secureTextEntry = {true}></TextInput>
            <Button title='Login' onPress={async() => {
                const b = await auth(id,password);
                 if (b){
                    Nav.navigate('Home')
                 }
        }}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingLeft:10,
        paddingTop: 60,
    },
})
