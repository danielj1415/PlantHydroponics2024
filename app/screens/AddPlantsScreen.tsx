import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, Image} from 'react-native'
import React, {useState} from 'react'
import { NavigationProp} from "@react-navigation/native";
import { FIREBASE_AUTH } from '../../config/FirebaseConfig';
import { collection, addDoc, doc, query, where, getDoc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import { FIREBASE_DB } from '../../config/FirebaseConfig';
import backarrowIcon from "../../assets/backarrowIcon.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import plantPictures from "./PlantImages";

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const AddPlantsScreen = ({navigation}: RouterProps) => {

    const [plant, setPlant] = useState("");

    const user = FIREBASE_AUTH.currentUser;
    const userID = user.uid;

    const getUserDocID = async() => {
        const userDocID = await AsyncStorage.getItem('userDocID');
        return userDocID;
    }

    const addPlant = async (plantInput) => {
        try {
            const userDocID2 = await getUserDocID();
            const userDocumentID = await retrievePlantDocumentId(userDocID2);
            //console.log("This is the id being used: " + userDocumentID);
            //console.log("This should be the user doc ID: " + userDocID2)
            //const plantsCollectionRef = collection(FIREBASE_DB, `user/${userDocID}/plants`);
            const plantDocRef = doc(FIREBASE_DB, 'user', userDocID2, 'plants', userDocumentID);
            const randomIndex = getRandomInt(0, plantPictures.length - 1); // Adjusted to the length of your array
            const randomPlantPicture = plantPictures[randomIndex];
            console.log(randomIndex);
            // Update the document with the new plant input
            updateDoc(plantDocRef, {
            plantName: arrayUnion(plantInput),
            plantImage: arrayUnion(randomIndex),
            });

          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    const retrievePlantDocumentId = async (userDocId) => {
    try {
        // Get a reference to the user document
        const userDocRef = doc(FIREBASE_DB, 'user', userDocId);

        // Read the document
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
        // Extract the documentID field
        const documentID = docSnap.data().plantDocumentID;
        console.log(documentID);
        return documentID;
        } else {
        throw new Error('No such document!');
        }
    } catch (error) {
        console.error("Error retrieving the document ID: ", error);
        throw error; // Re-throw the error to handle it where the function is called
    }
    };

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
      }
      


    const handleBackArrowPress = () => {
        navigation.navigate("PlantsScreen");
    }

    return(
        <View style = {{flex: 1, }}>
            <TouchableOpacity style={styles.backarrowIconStyle} onPress = {handleBackArrowPress}>
                    <Image source={backarrowIcon} />
                </TouchableOpacity>
            <View style = {styles.plantInputContainer}>
                <View>
                <Text style = {styles.plantText}>Plant</Text>
            </View>
            <TextInput
                style={styles.inputPlant}
                value={plant}
                placeholder="Please enter the name of your plant"
                keyboardType="email-address"
                autoCapitalize='none'
                onChangeText={(text) => setPlant(text)}
            />
            <TouchableOpacity
              style={styles.addPlantButton}
              onPress = {() => addPlant(plant)}
            >
                <Text style={styles.addPlantButtonText}>Add Plant</Text>
            </TouchableOpacity>
            </View>
            
            {/*<Text>{user.uid}</Text>*/}
            
        </View>
    )
} 

export default AddPlantsScreen

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
    },
    backarrowIconStyle: {
        position: 'absolute', // Use absolute positioning
        top: 64,              // 48 pixels from the top
        left: 20,             // 24 pixels from the left
    },
    plantText: {
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
    inputPlant: {
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
    plantInputContainer:{
        top: 96
    },
    addPlantButton:{
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
    addPlantButtonText:{
        color: 'white',
        fontSize: 16,
        fontFamily: 'Lato-Regular',
    },
});