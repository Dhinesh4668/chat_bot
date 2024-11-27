import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../../utils/theme';

const fontSize = {
    big: 24,
    primary: 16,
};

const HomeScreen = ({ navigation }) => {
    // Chat handle press
    const handleNewChat = () => {
        console.log('New chat pressed');
        navigation.navigate("chat");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                {/* Profile */}
                <View style={styles.profileContainer}></View>

                {/* Greet text */}
                <View style={styles.greetContainer}>
                    <Text style={styles.greetText}>
                        Explore knowledge {'\n'}
                        with <Text style={styles.highlight}>AI Chat</Text>
                    </Text>
                </View>

                {/* Chat button */}
                <Pressable style={styles.button} onPress={handleNewChat}>
                    <Text style={styles.buttonText}>Chat with AI</Text>
                </Pressable>

                {/* Chat history */}
                <View style={styles.historyContainer}>
                    <Text style={styles.sectionTitle}>Chat History</Text>
                    <Pressable onPress={() => console.log('View all chat history')}>
                        <Text style={styles.linkText}>See all</Text>
                    </Pressable>
                </View>

                {/* Trending News */}
                <View style={styles.trendingContainer}>
                    <Text style={styles.sectionTitle}>Trending</Text>

                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    innerContainer: {
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    profileContainer: {
        height: 50,
        width: 50,
        backgroundColor: colors.yellow,
        borderRadius: 25,
        marginBottom: 16,
        alignSelf: 'flex-start',
    },
    greetContainer: {
        // marginBottom: 30,
    },
    greetText: {
        fontSize: fontSize.big + 20,
        fontWeight: '300',
        color: colors.black,
        lineHeight: 60,
    },
    highlight: {
        color: colors.primary,
        fontWeight: '700',
    },
    button: {
        height: 50,
        backgroundColor: colors.yellow,
        borderRadius: 25,
        justifyContent: 'center',
        // alignItems: 'center',
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    buttonText: {
        fontSize: fontSize.primary,
        fontWeight: '500',
        color: colors.black,
    },
    historyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: fontSize.primary,
        fontWeight: '600',
        color: colors.black,
    },
    linkText: {
        fontSize: fontSize.primary,
        color: colors.gray,
        textDecorationLine: 'underline',
    },
    trendingContainer: {
        marginBottom: 20,
    },
    trendingCard: {
        backgroundColor: colors.gray,
        borderRadius: 12,
        padding: 16,
        marginTop: 10,
    },
    trendingText: {
        fontSize: fontSize.primary,
        color: colors.white,
    },
});
