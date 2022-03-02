import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SstLongSchoolQuest from '../components/school_quest/sst_long';
import SstShortSchoolQuest from '../components/school_quest/sst_short';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import SstShortSchoolDatabase from '../components/school_database/sst_short';

export default function Home() {
    //const ssts = [SstShort];
    const Nav = useNavigation();
    return (
        <View>
        <View style = {styles.container}><Text style = {styles.headtext}></Text></View>
        <SstShortSchoolQuest style = {styles.sstShort} Nav = {Nav} />
        <SstShortSchoolDatabase style = {styles.sstShort}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#4257F6',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 10,
    },
    headtext: {
      fontSize: 15,
      color: '#fff',
      fontWeight: 'bold',
      paddingBottom: 10,
    },
    sstShort: {
      //spacing between upper element
      backgroundColor: '#fff', 
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 10,
      borderColor: 'blue',
      //blue border
      borderWidth: 5,
    },
    map:{
        width: '100%',
        resizeMode: 'contain',
    },
});
  