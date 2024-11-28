import {
    ActivityIndicator,
    Alert,
    Image,
    Linking,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useEffect } from "react";
import { Arrow } from "../../assets";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { colors, fontSize } from "../../utils/theme";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
    const [user, setUser] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const navigation = useNavigation();

    useEffect(() => {
        getUserDetails();
    }, [])

    // Initialize GoogleSignin
    const getUserDetails = async () => {
        setLoading(true)
        try {
            const userData = await GoogleSignin.signInSilently();
            setUser(userData?.data);
            // console.log(user)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                console.log('User is not signed in');
            }
        } finally {
            setLoading(false)
        }
    };

    // Handle sign-out action

    const handleSignOut = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            {
                text: "Cancel",
                onPress: () => console.log("Logout canceled"),
                style: "cancel",
            },
            {
                text: "OK",
                onPress: async () => {
                    try {
                        await GoogleSignin.signOut();
                        setUser(null);
                        await AsyncStorage.clear();
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: "login" }]
                            })
                        );
                    } catch (error) {
                        console.error("Error during sign out:", error);
                    }
                },
            },
        ]);
    };



    // Reusable NameBar component
    const NameBar = ({ item, onPress }: { item: string; onPress: () => void }) => {
        return (
            <Pressable onPress={onPress} style={styles.nameBar}>
                <Text style={styles.name}>{item}</Text>
            </Pressable>
        );
    };

    // Display loading indicator
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.black} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Arrow color="black" />
                </Pressable>
                <Text onPress={handleSignOut} style={styles.logoutText}>
                    Logout
                </Text>
            </View>

            {/* Profile Section */}
            <View style={styles.profileContainer}>
                <Image
                    style={styles.profileImage}
                    source={{
                        uri: user?.user?.photo || "https://via.placeholder.com/100",
                    }}
                />
                <Text style={[styles.name, { fontSize: fontSize.big }]}>
                    {user?.user?.name || "Guest"}
                </Text>
                <Text style={styles.name}>{user?.user?.email || "No email available"}</Text>
            </View>

            {/* Support Section */}
            <View>
                <Text style={styles.supportText}>Support</Text>
                <NameBar
                    item="Source Code < >"
                    onPress={() =>
                        Linking.openURL("https://github.com/Dhinesh4668/chat_bot")
                    }
                />
                <NameBar
                    item="Authors | DhineshKumar Thirupathi"
                    onPress={() => Linking.openURL("https://github.com/Dhinesh4668/")}
                />
                <NameBar
                    item="Report a Bug"
                    onPress={() => Linking.openURL("mailto:dhinesh4668@outlook.com")}
                />
                <NameBar
                    item="Version v0.01"
                    onPress={() => Linking.openSettings()}
                />
            </View>

            {/* Footer */}
            <Pressable
                onPress={() => Linking.openURL("https://amazon.com/")}
                style={styles.footer}
            >
                <Text>Made with ♥️ by Dhineshkumar</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    logoutText: {
        color: colors.black,
        fontWeight: "bold",
        fontSize: fontSize.secondary,
    },
    profileContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        backgroundColor: "gray",
        marginBottom: 20,
    },
    supportText: {
        fontSize: fontSize.primary,
        fontWeight: "600",
        marginBottom: 10,
    },
    nameBar: {
        height: 50,
        width: "100%",
        backgroundColor: colors.background,
        marginBottom: 10,
        justifyContent: "center",
        paddingHorizontal: 18,
        borderRadius: 8,
    },
    name: {
        color: colors.black,
        fontSize: fontSize.secondary,
        fontWeight: "500",
    },
    footer: {
        marginTop: "auto",
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
    },
});
