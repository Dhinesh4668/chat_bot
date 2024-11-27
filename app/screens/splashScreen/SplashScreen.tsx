import React from "react";
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import { fontSize } from "../../utils/theme";

const SplashScreen = () :React.JSX.Element => {
    return (
      <View style={[styles.container, {
          flex: 1,
      }]}>
          <Text style={styles.text}>Helpyy</Text>
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

    },
    text: {
        fontSize: fontSize.big + 35,
        textAlign: 'center',
        color: "white",
        fontWeight: "600"
    },
});

export default SplashScreen;
