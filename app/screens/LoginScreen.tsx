import React from 'react';
import { Image, Text, View, Button, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from "../../config/FirebaseConfig";
import { FIREBASE_DB } from '../../config/FirebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import * as Font from 'expo-font';
import { NavigationProp } from '@react-navigation/native';
import backarrowIcon from "../../assets/backarrowIcon.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface StartScreenState {
    fontLoaded: boolean;
    email: string;
    password: string;
  
  }
  
  type Props = {
    navigation: NavigationProp<any>;
  };

export default class LoginScreen extends React.Component<Props, StartScreenState>{
    constructor(props) {
        super(props);
    
        this.state = {
          fontLoaded: false,
          email: "",
          password: ""
        };
      }

      isFormFilled = () => {
        return this.state.email.length > 0 && this.state.password.length > 0;
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
       this.props.navigation.navigate("Login");
    }
    handleContinueButton = async () => {
        try{
            const response = await signInWithEmailAndPassword(FIREBASE_AUTH, this.state.email, this.state.password);
            const userDocID = this.retrieveUserDocumentIdByEmail(this.state.email);
            await AsyncStorage.setItem('userDocID', await userDocID);
            console.log(response);
        }catch(error){
            console.log(error);
            alert('Sign in failed: ' + error.message);
        }
    }

    handleInputEmailChange = (text) => {
        this.setState({ email: text });
    }

    handleInputPasswordChange = (text) => {
        this.setState({ password: text });
    }

    retrieveUserDocumentIdByEmail = async (email) => {
        try {
            // Query the 'user' collection where the 'email' field matches the provided email
            const querySnapshot = await getDocs(query(collection(FIREBASE_DB, "user"), where("email", "==", email)));
            
            // Check if the querySnapshot has any documents
            if (!querySnapshot.empty) {
                // Assuming email is unique and there's only one document per user
                const userDoc = querySnapshot.docs[0];
                const userDocumentID = userDoc.data().userDocumentID;
                console.log("Retrieved userDocumentID: ", userDocumentID);
                return userDocumentID;
            } else {
                throw new Error('No user with that email found!');
            }
        } catch (error) {
            console.error("Error retrieving the user document ID by email: ", error);
            throw error;
        }
    }
    
    render() {
        if (!this.state.fontLoaded) {
            return null; // or a loading indicator
    }

    const isButtonActive = this.isFormFilled();
    return(
        <View style={{ flex: 1 }}>
            <View style = {styles.headerContainer}>
                <TouchableOpacity style={styles.backarrowIconStyle} onPress={this.handlePress}>
                    <Image source={backarrowIcon}/>
                </TouchableOpacity>
                <Text style = {styles.createAccount}>Login</Text>
            </View>
            <View>
                <Text style = {styles.emailText}>Email</Text>
            </View>
            <TextInput
                style={styles.input}
                onChangeText={this.handleInputEmailChange}
                value={this.state.email}
                placeholder="What is your email?"
                keyboardType="email-address"
                autoCapitalize='none'
            />
            <View>
                <Text style = {styles.nameText}>Password</Text>
            </View>
            <TextInput
                style={styles.input}
                onChangeText={this.handleInputPasswordChange}
                value={this.state.password}
                placeholder="What is your password?"
                keyboardType="visible-password"
                autoCapitalize='none'
            />
            <TouchableOpacity
              onPress={this.handleContinueButton}
              style={[styles.buttonStyle, isButtonActive ? null : styles.buttonInactive]}
              disabled={!isButtonActive}
            >
            <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}
}

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection: 'row', // Align items in a row
        alignItems: 'center', // Center items vertically
        justifyContent: 'center', // Center items horizontally
        marginTop: 64, // Adjust as needed
    },
    backarrowIconStyle: {
        position: 'absolute', // Use absolute positioning
        top: 4,              // 48 pixels from the top
        left: 20,             // 24 pixels from the left
    },
    createAccount:{
        fontFamily: "Lato-Bold",
        fontSize: 24, 
    },
    emailText: {
        left: 24,
        top: 0,
        color: '#757575',
        fontFamily: "Lato-Regular",
        marginTop: 32, 
    },
    nameText: {
        left: 24,
        top: 0,
        color: '#757575',
        fontFamily: "Lato-Regular",
        marginTop: 16, 
    },
    input: {
        height: 54,
        padding: 12,
        top: 0,
        width: 'auto', // Set the width as per your requirement
        backgroundColor: '#EEEEEE',
        marginTop: 4,
        marginLeft: 24,
        marginRight: 24,
        borderRadius: 4
    },
    buttonStyle: {
        backgroundColor: '#83B561', // You can change the color as needed
        height: 54,
        width: 'auto',
        paddingVertical: 14,
        borderRadius: 40,
        marginLeft: 24,
        marginRight: 24,
        marginTop:32,
        flexDirection: 'row', // Align items in a row
        alignItems: 'center', // Center items vertically
        justifyContent: 'center', // Center items horizontally
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Lato-Regular',
      },
      buttonInactive: {
        backgroundColor: '#CCCCCC', // Gray color for inactive state
        // Other styles for inactive state if needed
      },
})