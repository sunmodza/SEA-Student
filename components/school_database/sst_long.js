import React,{useState,useEffect} from 'react'
import {View, Text, StyleSheet, StatusBar,TouchableOpacity,ScrollView,RefreshControl} from 'react-native'
import {DataTable} from 'react-native-paper'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native';
import { getFirestore , collection ,getDocs,getDoc,onSnapshot,doc,query} from "firebase/firestore";
import { auth_tool ,db ,app} from '../../firebase-config';
import { useIsFocused } from "@react-navigation/native";
import { get_student_id } from '../school_quest/sst_main';
import { get } from 'firebase/database';
//import { DataTable } from 'react-native-paper';
//import Moment from 'react-moment';
//import 'moment-timezone';

const max_page = 2;
//convert find duration from now to input(str(dd/mm/yyyy hh:mm:ss)) in hours and minutes

//create sst componet with head and body
export default function SstLong() {
    const [refresh,setRefresh] = useState(false)
    const [score_data, setScoreData] = useState({})
    const Nav = useNavigation();

    const [point,setPoint] = useState(0)

    const db = getFirestore();

    const ref = doc(collection(db,"score_database"),get_student_id())
    
    useEffect(() => {
        onSnapshot(ref,(doc) => {
            setScoreData(doc.data())
        })
    },[])
    


    //console.log(completed_quest)
    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={() => {
                setRefresh(true)
                setTimeout(() => {
                    setRefresh(false)
                }, 1000);
            }}/>
        }>
            <View style={styles.container}>
                <DataTable>
                    <Text style={styles.headtext}>SchoolDatabase</Text>
                    
                    <DataTable.Header>
                        <DataTable.Title>SUBJECT</DataTable.Title>
                        <DataTable.Title>SCORE</DataTable.Title>
                        <DataTable.Title>FULL SCORE</DataTable.Title>
                    </DataTable.Header>

                
                    {Object.entries(score_data).map(([key,value]) => {
                        let total = 0;
                        let full_score = 0;
                        value.forEach(element => {
                            total += parseFloat(element.point);
                            full_score += parseFloat(element.full_score);
                        });
                        console.log(value)
                        return (
                            <TouchableOpacity onPress={()=>{
                                Nav.navigate('ViewSchoolDatabase',{
                                    subject:key,
                                    all_event:value,
                                    total_score:total,
                                    total_full:full_score
                                })
                            }}>
                                <DataTable.Row>
                                    <DataTable.Cell>{key}</DataTable.Cell>
                                    <DataTable.Cell>{total}</DataTable.Cell>
                                    <DataTable.Cell>{full_score}</DataTable.Cell>
                                </DataTable.Row>
                            </TouchableOpacity>
                        )
                    })}
                </DataTable>
            </View>
        </ScrollView>
    )
}                           

//create stylesheet
const styles = StyleSheet.create({
    container: {
        //spacing between upper element
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
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
    }
})

