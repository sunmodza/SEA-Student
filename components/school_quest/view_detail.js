import { StyleSheet, Text, View ,Image,ScrollView,AsyncStorage,Button,} from 'react-native';
import communication,{get_student_id,get_summited_quest} from './sst_main'
import { getStorage ,ref ,uploadBytesResumable,putFile,upload,uploadString, uploadBytes,listAll,Alert} from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker'
import firebase from 'firebase/app';
import 'firebase/storage';
import {getAuth} from 'firebase/auth'
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getFirestore , collection ,getDocs,getDoc,onSnapshot,doc,query,setDoc,updateDoc,arrayUnion} from "firebase/firestore";

//import { removeAllListeners } from 'npm';
//import storage from '@react-native-firebase/storage';

export default function Detail(props) {
    const Nav = useNavigation();
    const data = props.route.params.quest;
    const quest_id = props.route.params.quest_id
    const fetch_id= () => {
        const at = AsyncStorage.getItem('student_id').then((value) => {
            //console.log(value)
            return value;
        })
    }


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        })};

    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }
    
        const result = await ImagePicker.launchCameraAsync();
    
        // Explore the result
        //console.log(result);
        
    
        if (!result.cancelled) {
            const storage = getStorage();
            const db = getFirestore();
            const refer2 = doc(collection(db,'users'),get_student_id());
            updateDoc(refer2,{"summitting_quest":arrayUnion(quest_id)});
            const refer = ref(storage,'/quest_summit/' + get_student_id() + '-' + quest_id);
            Nav.navigate('QuestLong')
            const img = await fetch(result.uri);
            const bytes = await img.blob();
            await uploadBytes(refer,bytes);
        }

        return result;
        }
    fetch_id();
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>{data.name}</Text>
            <Text style={styles.text}>    {data.describe}</Text>

            <Text style = {styles.score}>
               SCORE {data.point}
            </Text>
            <Button title="SUBMIT YOUR RESULT" onPress={openCamera} />
            <Image style={styles.map} source={require('../../assets/map.jpg')}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#fff',

        //justifyContent: 'flex-start',

        paddingTop: 60,
        paddingLeft: 10,
    },
    text: {
        fontSize: 15,
        color: 'blue',
        textAlign: 'left',
    },
    score: {
        fontSize: 30,
        color: 'red',
    },
    map:{
        width: '100%',
        resizeMode: 'contain',
        alignContent: 'center',
        justifyContent: 'center',
    },
});