import React from 'react';
import { Image, Pressable, StyleSheet, Text, View, ImageSourcePropType, ToastAndroid, Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontSize } from '../../utils/theme';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Configure Google Sign-In
GoogleSignin.configure({
    webClientId: '174133860856-rio74opmmmq5jhqdlaaedmlrojlnjk3q.apps.googleusercontent.com',
    offlineAccess: true
});

// Define the type for the navigation prop
type RootStackParamList = {
    main: undefined;
};

type LoginScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'main'>;
};

const LoginImage: ImageSourcePropType = require('../../assets/images/home.jpg');

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {

    // Handle Google Sign-In
    const onGoogleButtonPress = async () => {
        try {
            console.log('Starting Google Sign-In...');
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const result = await GoogleSignin.signIn();
            // console.log('Google Sign-In Result:', result);

            // Extract the ID token explicitly
            const idToken = result.idToken || result?.data?.idToken;

            console.log('Extracted ID Token:', idToken);

            if (!idToken) {
                throw new Error('No ID token found. Please ensure your Web Client ID is configured correctly.');
            }

            // Create a Google credential
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign in to Firebase with the credential
            await auth().signInWithCredential(googleCredential);
            console.log('Firebase Authentication successful');
            await AsyncStorage.setItem('idtoken', idToken);

            if (Platform.OS === "android") {
                ToastAndroid.show("Login successfully !", ToastAndroid.BOTTOM);
            }

            navigation.navigate('main');
        } catch (error) {
            console.error('Google Sign-In Error:', error.message, error);
        }
    };


    return (
        <View style={styles.container}>
            {/* Top Button */}
            <View style={styles.topButton}>
                <Text style={styles.topButtonText}>Helpyy</Text>
            </View>

            {/* Main Text */}
            <View style={styles.mainTextContainer}>
                <Text style={styles.mainText}>
                    the best ai {'\n'}chatbot in the {'\n'}world with a fun {'\n'}concept
                </Text>
            </View>

            {/* Image */}
            <View style={styles.imageContainer}>
                <Image source={LoginImage} style={styles.image} resizeMode="contain" />
            </View>

            {/* Button */}
            <Pressable style={styles.button} onPress={onGoogleButtonPress}>
                <View style={styles.buttonContent}>
                    <Text style={styles.buttonText}>Get Started</Text>
                    <View style={styles.iconContainer}>
                        <Text style={styles.iconText}>-</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 16,
    },
    topButton: {
        display: "flex",
        flexDirection: "row",
        height: 41,
        width: 120,
        backgroundColor: colors.black,
        borderRadius: 20,
        marginTop: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    topButtonText: {
        color: colors.background,
        textAlign: "center",
        fontSize: fontSize.primary,
    },

    // Main Content
    mainTextContainer: {
        marginVertical: 20,
        width: "70%",
    },
    mainText: {
        fontSize: fontSize.big + 10,
        textAlign: "left",
        fontWeight: "500",
        textTransform: "capitalize",
    },

    // Image
    imageContainer: {
        flex: 1,
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "90%",
    },

    // Button
    button: {
        backgroundColor: colors.yellow,
        height: 50,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        marginBottom: 20,
    },
    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: fontSize.primary + 2,
        fontWeight: "600",
        color: colors.black,
        marginRight: 10,
    },
    iconContainer: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
    },
    iconText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});
