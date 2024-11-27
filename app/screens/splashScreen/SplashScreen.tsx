import React from "react";
import {View, Text, StyleSheet, StatusBar} from 'react-native';

const SplashScreen = () :React.JSX.Element => {
    return (
      <View style={[styles.container, {
          flex: 1,
      }]}>
          <Text style={styles.text}>Helpyy</Text>
          <StatusBar barStyle={'dark-content'} backgroundColor={"white"} />
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: "white",

    },
    text: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default SplashScreen;
