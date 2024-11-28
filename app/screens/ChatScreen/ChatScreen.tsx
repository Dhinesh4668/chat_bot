import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Pressable, Dimensions, ActivityIndicator } from 'react-native';
import { Gemini, SendIcon } from '../../assets';
import { colors } from '../../utils/theme';

const { height: screenHeight } = Dimensions.get('screen');

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchAIResponse = async (userMessage) => {
        setLoading(true);
        try {
            const response = await fetch(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDiZBPMH_XxDAIK0gYHY5K0aawBfb4w2Po',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'AIzaSyDiZBPMH_XxDAIK0gYHY5K0aawBfb4w2Po',
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    {
                                        text: userMessage,
                                    },
                                ],
                            },
                        ],
                    }),
                }
            );

            const data = await response.json();
            // console.log("response >>>>>>>>>>", data?.candidates?.[0]?.content?.parts?.[0]?.text)
            // Parse AI response text
            return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI.';
        } catch (error) {
            console.error('Error fetching AI response:', error);
            return 'Error: Unable to fetch AI response.';
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async () => {
        if (inputText.trim() === '') return;

        // Add user's message to chat
        const userMessage = { sender: 'user', text: inputText };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInputText('');

        // Fetch AI response
        const aiResponse = await fetchAIResponse(inputText);
        const aiMessage = { sender: 'AI', text: aiResponse };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Chat Screen</Text>
                </View>

                {/* Chat Body */}
                <View style={styles.chatBody}>
                    <ScrollView contentContainerStyle={{
                        flexGrow: 1
                    }} showsVerticalScrollIndicator={false}>

                        {messages.length === 0 ? (
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: "center",
                                flexDirection: "row",
                                gap: 5
                            }}>
                                <Gemini height={20} width={20} color={'white'} />
                                <Text style={{
                                    fontSize: 16,
                                    color: 'white'
                                }}>No messages yet.</Text>
                            </View>
                        ) : (
                            messages.map((message, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.message,
                                        message.sender === 'user' ? styles.userMessage : styles.aiMessage,
                                    ]}
                                >
                                    {loading && message.sender !== 'user' ? (
                                        <ActivityIndicator size="small" color="white" />
                                    ) : null}
                                    {/* ai icon */}
                                    {message.sender === 'AI' && (
                                        <Gemini height={20} width={20} color={'white'} style={{ marginBottom: 5 }} />
                                    )}

                                    {/* user */}
                                    <Text selectable style={[styles.messageText, {
                                        color: message.sender === 'user' ? 'black' : 'white'
                                    }]}>{message.text}</Text>
                                </View>
                            ))
                        )}

                    </ScrollView>
                </View>
                {/* Input Section */}
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Type here"
                        placeholderTextColor="#888"
                        value={inputText}
                        onChangeText={setInputText}
                        style={styles.textInput}
                        cursorColor={colors.yellow}
                        selectionColor={colors.yellow}
                    />
                    <Pressable onPress={handleSend} style={styles.sendButton} disabled={loading}>
                        {/* <Text style={styles.sendButtonText}>{loading ? 'Sending...' : 'Send'}</Text> */}
                        <SendIcon height={20} width={20} color={'black'} />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContent: {
        flexGrow: 1,
    },
    header: {
        height: screenHeight * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingHorizontal: 16,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    chatBody: {
        flex: 1,
        backgroundColor: 'black',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 16,
        minHeight: screenHeight * 0.7,
    },
    message: {
        marginVertical: 8,
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: colors.yellow,
        color: 'black',
    },
    aiMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#444',
    },
    messageText: {
        color: 'white',
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        // borderTopColor: '#ddd',
        // marginTop: "auto"
        backgroundColor: "black"
    },
    textInput: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: colors.yellow,
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    sendButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
