import React, { useEffect } from 'react'
import SplasScreen from './app/screens/splashScreen/SplashScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
// import root from './app/navigation/root';
import LoginScreen from './app/screens/LoginScreen/LoginScreen';
import ChatScreen from './app/screens/ChatScreen/ChatScreen';
import { StatusBar } from 'react-native';
// import { colors } from './app/utils/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './app/screens/HomeScreen/HomeScreen';
import ProfileScreen from './app/screens/ProfileScreen/ProfileScreen';
const Stack = createNativeStackNavigator();

const App = () => {
  const [splash, setSplash] = React.useState(true);
  const [login, setLogin] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setSplash(false)
    }, 2000);
  }, []);

  // check is login or not 
  const checkLogin = async () => {
    try {
      const value = await AsyncStorage.getItem('idtoken');
      // console.log("value >>>>>>>>>>>>>>>", value)
      if (value) {
        setLogin(true)
      } else {
        setLogin(false)
      }
    } catch (e) {
      console.log(e)
    }
  }


  React.useEffect(() => {
    checkLogin()
  }, [])
  if (splash) {
    return (
      <SplasScreen />
    )
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={login ? "main" : "login"} screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="main" component={HomeScreen} />
        <Stack.Screen name="Splash" component={SplasScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name='chat' component={ChatScreen} />
        <Stack.Screen name='profile' component={ProfileScreen} />
      </Stack.Navigator>

      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
    </NavigationContainer>
  );
};

export default App;
