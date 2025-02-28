/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import * as RNIap from 'react-native-iap';
import IAPScreen from './IAPScreen'; // Import the subscription screen




const App = () => {
  useEffect(() => {
    const initIAP = async () => {
      try {
        await RNIap.initConnection();
        console.log('IAP connection initialized');
      } catch (error) {
        console.warn('IAP Init Error:', error);
        Alert.alert('Error', 'Failed to initialize In-App Purchases.');
      }
    };

    initIAP();

    return () => {
      RNIap.endConnection(); // Clean up when app closes
    };
  }, []);

  return <IAPScreen />; // Render the IAP screen
};

export default App;

export default App;
