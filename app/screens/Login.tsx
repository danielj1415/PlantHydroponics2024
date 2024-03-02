import {View, StyleSheet, TextInput, Button, ActivityIndicator} from "react-native";
import React, { useState} from 'react'
import { FIREBASE_AUTH } from "../../config/FirebaseConfig";
import { FIREBASE_DB } from '../../config/FirebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const Login = () => {

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        }catch(error){
            console.log(error);
            alert('Sign in failed: ' + error.message);
        }finally{
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Check your emails!');
            const uid = FIREBASE_AUTH.currentUser.uid
            const docRef =  addDoc(collection(FIREBASE_DB, `user`), {
                user: uid,
                email: email,
                password: password
              });
        }catch(error){
            console.log(error);
            alert('Sign up failed: ' + error.message);
        }finally{
            setLoading(false);
        }
    }

    return(
        <View style = {styles.container}>
            <TextInput value = {email} style = {styles.input} placeholder = "Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput secureTextEntry = {true} value = {password} style = {styles.input} placeholder = "Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>

            {loading ? (
                <ActivityIndicator size = "large" color = "#0000ff"/> 
            ) : (
                <> 
                    <Button title = "Login" onPress = {signIn}/>
                    <Button title = "SignUp" onPress = {signUp}/>
                </>
            ) }
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        marginVertical: 4, 
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: "#ffffff",
    }
});