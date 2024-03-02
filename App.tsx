import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StyleSheet, Text, View } from 'react-native';
import Login from './app/screens/Login';
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState} from 'react'
import { FIREBASE_AUTH } from './config/FirebaseConfig';
import Details from './app/screens/Details';
import StartScreen from './app/screens/StartScreen';
import LoginScreen from "./app/screens/LoginScreen";
import SignupScreen from "./app/screens/SignupScreen";
import HomeScreen from './app/screens/HomeScreen';
import PlantsScreen from "./app/screens/PlantsScreen";
import SettingsScreen from "./app/screens/SettingsScreen";
import AddPlantsScreen from './app/screens/AddPlantsScreen';
import ViewPlantScreen from "./app/screens/ViewPlantScreen";
import plantPictures from './app/screens/plantpictures';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout(){
  return(
    <InsideStack.Navigator>
      <InsideStack.Screen name = "HomeScreen" component = {HomeScreen} options = {{headerShown:false}}/>
      <InsideStack.Screen name = "PlantsScreen" component = {PlantsScreen} options = {{headerShown:false}}/>
      <InsideStack.Screen name = "SettingsScreen" component = {SettingsScreen} options = {{headerShown:false}}/>
      <InsideStack.Screen name = "AddPlantsScreen" component = {AddPlantsScreen} options = {{headerShown:false}}/>
      <InsideStack.Screen name = "ViewPlantScreen" component = {ViewPlantScreen} options = {{headerShown:false}}/>
    </InsideStack.Navigator>

  )
}

export default function App() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  },[])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' >
        {user ? (
          <Stack.Screen name='Inside' component = {InsideLayout} options = {{headerShown:false}}></Stack.Screen>
        ) : (
          <>
            <Stack.Screen name='Login' component = {StartScreen} options = {{headerShown:false}}></Stack.Screen>
            <Stack.Screen name = "SignupScreen" component = {SignupScreen} options = {{headerShown:false}}></Stack.Screen>
            <Stack.Screen name = "LoginScreen" component = {LoginScreen} options = {{headerShown:false}}></Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


