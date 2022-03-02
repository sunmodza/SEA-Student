import { StyleSheet, Text, View ,Image,ScrollView,AsyncStorage,Button,} from 'react-native';
import 'firebase/storage';
import {getAuth} from 'firebase/auth'
import { useEffect ,useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import { getFirestore,doc,onSnapshot,collection } from 'firebase/firestore';
import { get_student_id } from '../school_quest/sst_main';

//import { removeAllListeners } from 'npm';
//import storage from '@react-native-firebase/storage';

export default function Detail(props) {
    const Nav = useNavigation();
    const subject = props.route.params.subject;
    //const all_event = props.route.params.all_event;
    //const total_score = props.route.params.total_score;
    ///const total_full = props.route.params.total_full;

    const db = getFirestore();

    const [total_score,setTotal_score] = useState(0);
    const [total_full,setTotal_full] = useState(0);

    const [all_event,set_all_event] = useState({});
    const [ready,set_ready] = useState(false);

    //console.log(all_event)

    useEffect(() => {
        const ref = doc(collection(db,"score_database"),get_student_id())
        onSnapshot(ref,(doc) => {
            const ptrx = doc.data()[subject];
            set_all_event(ptrx);
            let full = 0;
            let total = 0;
            ptrx.forEach(element => {
                full += parseFloat(element.full_score)
                total += parseFloat(element.point)
            });
            setTotal_full(full);
            setTotal_score(total);
            set_ready(true);
        })
    },[])

    return (
        <ScrollView style={styles.container}>
            <DataTable>
                    <Text style={styles.headtext}>{subject}</Text>
                    
                    <DataTable.Header>
                        <DataTable.Title>EVENT</DataTable.Title>
                        <DataTable.Title>SCORE</DataTable.Title>
                        <DataTable.Title>FULL SCORE</DataTable.Title>
                    </DataTable.Header>

                    {Object.entries(all_event).map(([key,value]) => {
                        return (
                                <DataTable.Row>
                                    <DataTable.Cell>{value.event}</DataTable.Cell>
                                    <DataTable.Cell>{value.point}</DataTable.Cell>
                                    <DataTable.Cell>{value.full_score}</DataTable.Cell>
                                </DataTable.Row>
                                )
                    })}
                    <DataTable.Header>
                        <DataTable.Title>TOTAL</DataTable.Title>
                        <DataTable.Title>{total_score}</DataTable.Title>
                        <DataTable.Title>{total_full}</DataTable.Title>
                    </DataTable.Header>
                </DataTable>
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