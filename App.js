import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './scene/home';
import Login from './scene/login';
import Nav from './nav/navigation';
import SstShort from './components/school_quest/sst_short';
import QuestLong from './components/school_quest/sst_long';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import ViewDetail from './components/school_quest/view_detail';

import ViewDetailDataBase from './components/school_database/view_detail';
import SstLongSchoolDatabase from './components/school_database/sst_long';


//create navigation


export default function App() {
  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component = {Login}/>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="QuestLong" component={QuestLong} />
        <Stack.Screen name="ViewSchoolDetail" component={ViewDetail} />
        <Stack.Screen name="LongSchoolDatabase" component={SstLongSchoolDatabase} />
        <Stack.Screen name="ViewSchoolDatabase" component={ViewDetailDataBase} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}