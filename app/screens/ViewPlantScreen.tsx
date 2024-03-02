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
import backarrowIcon from "../../assets/backarrowIcon.png";

interface StartScreenState {
    fontLoaded: boolean;
  
  }
  type Props = {
    navigation: NavigationProp<any>;
  };

export default class HomeScreen extends React.Component<Props, StartScreenState>{
    pressInterval: any;
    constructor(props) {
        super(props);
    
        this.state = {
            fontLoaded: false,
        };
        this.pressInterval = null;
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
        this.props.navigation.goBack();
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
    handleWaterButtonPress = () => {
        console.log('Add Water Button long pressed.');
    }
    handlePHButtonPress = () => {
        console.log('Add PH Button long pressed.');
    }
    startLoggingWater = () => {
        console.log('Water Button is being pressed...'); // Initial log
        // Start an interval that logs to the console every 500ms
        this.pressInterval = setInterval(() => {
          console.log('Water Button is still being pressed...');
        }, 500);
      };
    
    stopLoggingWater = () => {
        console.log('Water Button was released.');
        if (this.pressInterval) {
          clearInterval(this.pressInterval); // Clear the interval when the button is released
          this.pressInterval = null; // Reset the interval variable
        }
      };
      startLoggingPH = () => {
        console.log('PH Button is being pressed...'); // Initial log
        // Start an interval that logs to the console every 500ms
        this.pressInterval = setInterval(() => {
          console.log('PH Button is still being pressed...');
        }, 500);
      };
    
    stopLoggingPH = () => {
        console.log('PH Button was released.');
        if (this.pressInterval) {
          clearInterval(this.pressInterval); // Clear the interval when the button is released
          this.pressInterval = null; // Reset the interval variable
        }
      };
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
                    Plant Name
                </Text>
                <View style = {styles.buttonContainer}>
                    <TouchableOpacity 
                        style = {styles.waterButton}
                        onPressIn={this.startLoggingWater}
                        onPressOut={this.stopLoggingWater}
                        >
                        <Text style = {styles.floatingButtonText}>
                            Add Water
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = {styles.phButton}
                        onPressIn={this.startLoggingPH}
                        onPressOut={this.stopLoggingPH}>
                        <Text style = {styles.floatingButtonText}>
                            Add pH
                        </Text>
                    </TouchableOpacity>
                </View>
                
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
        fontFamily: 'Lato-Regular', // Font of the '+' icon
      },
      backarrowIconStyle: {
        position: 'absolute', // Use absolute positioning
        top: 64,              // 48 pixels from the top
        left: 20,             // 24 pixels from the left
    },
    waterButton:{
        height: 50,
        width: 162,
        backgroundColor: "#4982C6",
        borderRadius: 8,
        justifyContent: 'center', // Center the '+' icon vertically
        alignItems: 'center', // Center the '+' icon horizontally
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 }, // Shadow direction and distance from the button
        shadowOpacity: 0.3, // Shadow opacity
        shadowRadius: 5, // Blur radius of the shadow
    },
    phButton:{
        height: 50,
        width: 162,
        backgroundColor: "#9E479F",
        borderRadius: 8,
        justifyContent: 'center', // Center the '+' icon vertically
        alignItems: 'center', // Center the '+' icon horizontally
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 }, // Shadow direction and distance from the button
        shadowOpacity: 0.3, // Shadow opacity
        shadowRadius: 5, // Blur radius of the shadow
        marginLeft: 20
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        top: 16,
    }
})