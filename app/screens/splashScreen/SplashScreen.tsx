import React from "react";
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import { fontSize } from "../../utils/theme";
import { AiIcon, Gemini } from "../../assets";

const SplashScreen = () :React.JSX.Element => {
    return (
      <View style={[styles.container, {

        }]}>

            <View style={{
                marginRight: 20,
                flexDirection: "row"
            }}>

                <Gemini height={30} width={30} />
          <Text style={styles.text}>Helpyy</Text>
            </View>
            <StatusBar barStyle={'dark-content'} backgroundColor={"black"} />
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: "black",
        flex: 1,

    },
    text: {
        fontSize: fontSize.big + 35,
        textAlign: 'center',
        color: "white",
        fontWeight: "600"
    },
});

export default SplashScreen;
