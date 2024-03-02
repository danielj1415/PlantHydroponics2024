import React from 'react';
import { Image, Text, View, ScrollView,Button, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { NavigationProp } from '@react-navigation/native';
import homegreenIcon from "../../assets/homegreenIcon.png";
import plantsgrayIcon from "../../assets/plantsgrayIcon.png";
import settingsgrayIcon from "../../assets/settingsgrayIcon.png";
import homegrayIcon from "../../assets/homegrayIcon.png";
import plantsgreenIcon from "../../assets/plantsgreenIcon.png";
import settingsgreenIcon from "../../assets/settingsgreenIcon.png";
import { FIREBASE_AUTH } from '../../config/FirebaseConfig';

interface StartScreenState {
    fontLoaded: boolean;
  
  }
  type Props = {
    navigation: NavigationProp<any>;
  };

export default class HomeScreen extends React.Component<Props, StartScreenState>{
    constructor(props) {
        super(props);
    
        this.state = {
            fontLoaded: false,
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

    handleNavHomeButton = () => {
        this.props.navigation.navigate("HomeScreen");
    }
    handleNavPlantsButton = () => {
        this.props.navigation.navigate("PlantsScreen");
    }
    handleNavSettingsButton = () => {
        this.props.navigation.navigate("SettingsScreen");
    }
    handleSignOut = () => {
        
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
                    Settings
                </Text>
                <TouchableOpacity 
                style = {styles.signoutButton} 
                onPress = {() => FIREBASE_AUTH.signOut()}>
                    <Text style = {styles.signoutText}>
                        Sign out
                    </Text>
                </TouchableOpacity>
            </ScrollView>
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
                        <Image source = {plantsgrayIcon}/>
                        <Text style = {styles.grayText}>Plants</Text>
                    </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {this.handleNavSettingsButton}
                >
                    <View style = {styles.navigationMenu}>
                    <View style = {styles.settingsContainer}>
                        <Image source = {settingsgreenIcon} style = {styles.settingsIcon}/>
                        <Text style = {styles.homeText}>Settings</Text>
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
    signoutButton:{
        marginLeft: 24,
        marginTop: 24,
    },
    signoutText:{
        color: 'black',
        fontSize: 16,
        fontFamily: 'Lato-Regular',
    }
})
