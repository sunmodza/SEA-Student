import React,{useState,useEffect} from 'react'
import {View, Text, StyleSheet, StatusBar,TouchableOpacity,Image,ScrollView,RefreshControl} from 'react-native'
import {DataTable} from 'react-native-paper'
import moment from 'moment'
import communication,{get_summited_quest,get_student_id,get_accomplish_quest} from './sst_main'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import { getFirestore , collection ,getDocs,getDoc,onSnapshot,doc,setDoc} from "firebase/firestore";
import { auth_tool ,db ,app} from '../../firebase-config';
import { getStorage,ref,listAll } from "firebase/storage";
import { useIsFocused } from "@react-navigation/native";

export default function SstLong() {
    const Nav = useNavigation();
    const [time,setTime] = useState(new Date().toLocaleTimeString())

    const [sstNickName,setSstNickName] = useState('School Quest')

    const [quests,setQuest] = useState({})

    const [summited_quest,setSummitedQuest] = useState([])

    const [completed_quest,setCompletedQuest] = useState([])

    const [ready,setReady] = useState(false)

    const focused = useIsFocused();

    const [refresh,setRefresh] = useState(false)

    const [eventName,setEventName] = useState('Dead By Daylight - Event!!')

    const [summitting_quest,setSummittingQuest] = useState([])
    //update time every 0.1 second
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString())}, 100);
        return () => clearInterval(interval);
    }, []);

    //get_accomplish_quest()
    //console.log(eventSource)
    useEffect(() => {
        communication(setQuest)
        get_summited_quest().then(
            (res) => {
                setSummitedQuest(res)
                setReady(true)
            }
        )
        const db = getFirestore(app);
        const unsub = onSnapshot(doc(db,("users"+"/"+get_student_id())), (doc) => {
            //setCompletedQuest(doc.get('completed_quest'))
            const the_fetch_complete = doc.get('completed_quest');
            if (the_fetch_complete !== undefined){
                setCompletedQuest(the_fetch_complete)
            }
        });

        const unsub2 = onSnapshot(doc(db,("users"+"/"+get_student_id())), (doc) => {
            //const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
                //setSummitedQuest([...doc.get('completed_quest'),...summited_quest])
                const the_fetch_complete = doc.get('summitting_quest');
                if (the_fetch_complete !== undefined){
                    setSummittingQuest(the_fetch_complete)
                }
            });
    },[focused,refresh]);
    //get_summited_quest(setSummitedQuest)

    useEffect(() => {
        Object.entries(quests).map(([key,value]) => {
            //console.log(quests[key])
            quests[key]['out-in'] = moment(quests[key]['out-dated'],"DD-MM-YYYY h:mm:ss").fromNow()
        })

    } ,[quests])

    return (
        <ScrollView style={styles.scroller} refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={() => {
                setRefresh(true)
                setTimeout(() => {
                    setRefresh(false)
                }, 1000);
            }} />
        }>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {Nav.navigate('Home')}}>
                    <Text style={styles.headtext}>{sstNickName}</Text>
                </TouchableOpacity>
                    <Text style={styles.bodytext}>{eventName}</Text>
                    <Text style={styles.bodytext}>Now {time}</Text>
                    <Text style={styles.bodytext}>Completed {completed_quest.length}</Text>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title><Text style={styles.bodytext}>Descibe</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.bodytext}>Out-Dated</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.bodytext}>Point</Text></DataTable.Title>
                    </DataTable.Header>

                {Object.entries(quests).map(([key,value]) => {
                    const color_code = summitting_quest.includes(key) ? 'green' : 'black';
                    if (ready && !completed_quest.includes(key)){
                        return (
                            <TouchableOpacity onPress={() => {Nav.navigate('ViewSchoolDetail',{'quest':quests[key],'quest_id':key})}}>
                            <DataTable.Row style = {styles.questItems}>
                                <DataTable.Cell><Text style={{color:color_code}}>{quests[key].name}</Text></DataTable.Cell>
                                <DataTable.Cell><Text style={{color:color_code}}>{quests[key]['out-in']}</Text></DataTable.Cell>
                                <DataTable.Cell><Text style={{color:color_code}}>{quests[key].point}</Text></DataTable.Cell>
                            </DataTable.Row>
                            </TouchableOpacity>)
                    }}
                )}
                </DataTable>
            </View>
        </ScrollView>
    )
}

//<Image style={styles.map} source={require('../../assets/map.jpg')}/>

const styles = StyleSheet.create({
    container: {
        //spacing between upper element
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 40,
        borderColor: 'blue',
        //blue border
        borderWidth: 5,
    },
    headtext: {
        fontSize: 15,
        color: 'blue',
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    bodytext: {
        fontSize: 15,
        width: '100%',
        color: 'blue',
        fontWeight: 'bold',
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#fff',
        textAlign: 'left',
    },
    questItems: {
        fontSize: 15,
        width: '100%',
        color: 'blue',
        fontWeight: 'bold',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    map:{
        width: '100%',
        resizeMode: 'contain',
    },
    scroller:{
        
    }
})

