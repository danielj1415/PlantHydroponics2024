import React from 'react';
import { Image, Text, View, ScrollView,Button, TouchableOpacity, TextInput, Touchable, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { NavigationProp } from '@react-navigation/native';
import homegreenIcon from "../../assets/homegreenIcon.png";
import plantsgrayIcon from "../../assets/plantsgrayIcon.png";
import settingsgrayIcon from "../../assets/settingsgrayIcon.png";
import homegrayIcon from "../../assets/homegrayIcon.png";
import plantsgreenIcon from "../../assets/plantsgreenIcon.png";
import settingsgreenIcon from "../../assets/settingsgreenIcon.png";
import { FIREBASE_DB } from '../../config/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

import plant1 from "../../assets/Plant1.png";
import plant2 from "../../assets/Plant2.png";
import plant3 from "../../assets/Plant3.png";

interface StartScreenState {
    fontLoaded: boolean;
    plants: [],
  }
  type Props = {
    navigation: NavigationProp<any>;
  };

export default class HomeScreen extends React.Component<Props, StartScreenState>{
    constructor(props) {
        super(props);
    
        this.state = {
            fontLoaded: false,
            plants: [],
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
        this.fetchPlants();
    }

    handleNavHomeButton = () => {
        this.props.navigation.navigate("HomeScreen");
    }
    handleNavPlantsButton = () => {
        this.props.navigation.navigate("PlantsScreen");
    }
    handleNavSettingsButton = () => {
        this.props.navigation.navigate("SettingsScreen");
    }
    handleAddPlantButton = () => 
    {;
        this.props.navigation.navigate("AddPlantsScreen")
    }
    handleViewPlantButton = () => {
        this.props.navigation.navigate("ViewPlantScreen");
    }

    fetchPlants = async () => {
        try {
            const plantsCollectionRef = collection(FIREBASE_DB, 'user', 'USER_DOC_ID', 'plants')
            const querySnapshot = await getDocs(plantsCollectionRef);
            const plantsData = querySnapshot.docs.map(doc => ({

            }));
        }
        catch (error) {
            console.error("Error fetching plants: ", error);
            // Handle any errors here, such as updating the state to show an error message
          }
    }
    
    render() {
        if (!this.state.fontLoaded) {
            return null; // or a loading indicator
    }

    return(
        <View style = {{flex: 1}}>
            <ScrollView 
            style={{ flex: 1}}
            bounces={false}              // Disable bounce effect for iOS
            overScrollMode="never"
            >
                <Text style = {styles.heading1}>
                    Plants
                </Text>
                <View style = {styles.gridContainer}>
                <View style = {styles.plant1Container}>
                    <Image source = {plant1}/>
                    <Text style = {styles.plantName}>
                        Plant 1
                    </Text>
                    <TouchableOpacity 
                        style = {styles.viewplantButton} 
                        onPress = {this.handleViewPlantButton}>
                        <Text style = {styles.viewplantText}>
                            View Plant
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.plant1Container}>
                    <Image source = {plant2}/>
                    <Text style = {styles.plantName}>
                        Plant 2
                    </Text>
                    <TouchableOpacity 
                        style = {styles.viewplantButton}
                        onPress = {this.handleViewPlantButton}>
                        <Text style = {styles.viewplantText}>
                            View Plant
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.plant1Container}>
                    <Image source = {plant2}/>
                    <Text style = {styles.plantName}>
                        Plant 2
                    </Text>
                    <TouchableOpacity 
                        style = {styles.viewplantButton}
                        onPress = {this.handleViewPlantButton}>
                        <Text style = {styles.viewplantText}>
                            View Plant
                        </Text>
                    </TouchableOpacity>
                </View>
                
                
                
                </View>
            </ScrollView>

            <TouchableOpacity
                style={styles.floatingButton}
                onPress={this.handleAddPlantButton}
            >
                <Text style={styles.floatingButtonText}>Add Plant</Text>
            </TouchableOpacity>

            <View style = {styles.navigationContainer}>
                <TouchableOpacity
                    onPress = {this.handleNavHomeButton}
                >
                    <View style = {styles.navigationMenu}>
                    <View style = {styles.homeContainer}>
                        <Image source = {homegrayIcon}/>
                        <Text style = {styles.grayText}>Home</Text>
                    </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {this.handleNavPlantsButton}
                >
                    <View style = {styles.navigationMenu}>
                    <View style = {styles.plantsContainer}>
                        <Image source = {plantsgreenIcon}/>
                        <Text style = {styles.homeText}>Plants</Text>
                    </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {this.handleNavSettingsButton}
                >
                    <View style = {styles.navigationMenu}>
                    <View style = {styles.settingsContainer}>
                        <Image source = {settingsgrayIcon} style = {styles.settingsIcon}/>
                        <Text style = {styles.grayText}>Settings</Text>
                    </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        
    );
}
}

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: "blue",
        width: '100%',
        height: 600
    },
    secondContainer:{
        backgroundColor: "green",
        width: '100%',
        height: 500
    },
    navigationMenu: {
        height: 86, // Adjust as needed
        backgroundColor: '#fff', // Set the background color for the navigation menu
        justifyContent: 'center', // Center items vertically
        alignItems: 'center', // Center items horizontally
      },
      navigationContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopWidth: 1, // Add a border to the top with a width of 1 (you can adjust this as needed)
        borderTopColor: '#D5D5D5',
    },
    homeContainer:{
        justifyContent: 'center', // Center items vertically
        alignItems: 'center',
    },
    plantsContainer:{
        justifyContent: 'center', // Center items vertically
        alignItems: 'center',
        marginBottom: 2,
        marginLeft: 72,
        marginRight: 72
    },
    settingsContainer:{
        justifyContent: 'center', // Center items vertically
        alignItems: 'center',
        marginBottom: 1,
    },
    homeText:{
        color: "#577930",
        fontFamily: "Lato-Bold",
        fontSize: 12
    },
    grayText:{
        color: "#9A9A9A",
        fontFamily: "Lato-Bold",
        fontSize: 12
    },
    settingsIcon:{
        width: 22,
        height: 22
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between', // This will take care of spacing between items
        alignItems: 'center',
        marginLeft: 24,
        marginRight: 24,
    },
    plant1Container:{
        backgroundColor: "white",
        width: 162,
        height: 224,
        alignSelf: 'center',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    heading1:{
        color: 'black',
        fontFamily: "Lato-Bold",
        fontSize: 32,
        marginLeft: 24,
        marginTop: 64,
    },
    plantName:{
        fontFamily: "Lato-Bold",
        color: 'black', 
        fontSize: 20,
        marginTop: 8
    },
    viewplantButton:{
        backgroundColor: "#577930",
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
        
    },
    viewplantText: {
        fontFamily: "Lato-Bold",
        color: 'white', 
        fontSize: 14
    },
    floatingButton: {
        position: 'absolute', // Position button over everything else
        right: 30, // Distance from the right edge of the screen
        bottom: 110, // Distance from the bottom edge of the screen
        backgroundColor: '#97C364', // Background color of the button
        width: 162, // Width of the button
        height: 58, // Height of the button
        borderRadius: 8, // Make it circular
        justifyContent: 'center', // Center the '+' icon vertically
        alignItems: 'center', // Center the '+' icon horizontally
        zIndex: 1, // Make sure the button is above everything else
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 }, // Shadow direction and distance from the button
        shadowOpacity: 0.3, // Shadow opacity
        shadowRadius: 5, // Blur radius of the shadow
      },
      
      floatingButtonText: {
        color: 'white', // Color of the '+' icon
        fontSize: 24, // Size of the '+' icon
        fontFamily: 'Lato-Bold', // Font of the '+' icon
      },
      
})