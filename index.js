/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import crashlytics from '@react-native-firebase/crashlytics';

// crashlytics().log('App started');

// analytics().logEvent();

AppRegistry.registerComponent(appName, () => App);
