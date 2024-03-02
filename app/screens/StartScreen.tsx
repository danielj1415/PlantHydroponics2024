import React, {useState}from 'react';
import { Image, Text, View, Button, TouchableOpacity, StyleSheet, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

import StartScreenPicture from "../../assets/StartScreenPicture.png";
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from "../../config/FirebaseConfig";
import { FIREBASE_DB } from '../../config/FirebaseConfig';
import { signOut } from "firebase/auth";


interface StartScreenState {
  fontLoaded: boolean;
  email: string;
  password: string;

}
type Props = {
  navigation: NavigationProp<any>;
};


export default class StartScreen extends React.Component<Props, StartScreenState> {

  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      email: "",
      password: ""
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Lora-Bold': require('../../assets/fonts/Lora-Bold.ttf'),
      'Lora-Regular': require('../../assets/fonts/Lora-Regular.ttf'),
      'Lora-SemiBold': require("../../assets/fonts/Lora-SemiBold.ttf"),
      'Inter-Regular': require("../../assets/fonts/Inter-Regular.ttf"),
      'Inter-Bold': require("../../assets/fonts/Inter-Bold.ttf"),
      'Lato-Regular': require("../../assets/fonts/Lato-Regular.ttf"),
      'Lato-Bold': require("../../assets/fonts/Lato-Bold.ttf"),
    });

    this.setState({ fontLoaded: true });
  }

  handlePress = () => {
    this.props.navigation.navigate("SignupScreen");
   }
   handlePressLogin = () => {
    this.props.navigation.navigate("LoginScreen");
   }

  render() {
    if (!this.state.fontLoaded) {
      return null; // or a loading indicator
    }

    return (
      <View style={styles.container}>
          <Image source = {StartScreenPicture} style={styles.image}/>
          <LinearGradient
          colors={['transparent', 'black']} // Gradient from transparent to black
          style={styles.gradientStyle}
          />
          <View style={styles.overlay}>
            <Text style={styles.heading1Text}>PlantBuddy</Text>
          </View>
          <View style = {styles.overlay2}>
            <Text style={styles.heading2Text}>Plant and soil care.{"\n"}Simplified.</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={this.handlePress}
              style={styles.buttonStyle}
            >
            <Text style={styles.buttonText}>Get started</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.mainTextOverlay}>
            <Text style = {styles.mainText}>Already have an account?</Text>
            <TouchableOpacity
              onPress={this.handlePressLogin}
            >
              <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>
          </View>
       </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: "10%",
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  overlay2:{
    position: 'absolute', 
    top: "62%",
    left: 0,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  gradientStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%', // Adjust the height as needed
  },
  heading1Text: {
    fontSize: 40,
    color: 'white',
    fontFamily: 'Lora-SemiBold',
  },
  heading2Text: {
    fontSize: 28,
    color: 'white',
    fontFamily: 'Lora-Regular',
    marginTop: 100,
    textAlign: 'center'
  },
  buttonContainer:{
    position: 'absolute',
    top: '85%',   // Adjust these values as needed
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
   },
   buttonStyle: {
    backgroundColor: '#83B561', // You can change the color as needed
    paddingHorizontal: 120,
    paddingVertical: 10,
    borderRadius: 40
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Lato-Regular',
  },
  mainTextOverlay:{
    position: 'absolute',
    top: '92%', // Adjust as needed
    left: 0, // Start from the left edge
    right: 0, // Stretch to the right edge
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center contents horizontally
  },
  mainText: {
    color: 'white',
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    marginRight: 4,
  },
  loginButtonText: {
    color: '#C7FFA1',
    fontFamily: 'Lato-Regular',
    fontSize: 16,
  }
});