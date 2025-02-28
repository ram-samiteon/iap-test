import React, {useEffect, useState} from 'react';
import {Alert, Button, Text, View} from 'react-native';
import * as RNIap from 'react-native-iap';

// 🔥 Make sure this matches App Store Connect
const productIds = ['com.trueelements.bubble_pro'];

const IAPScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const initIAP = async () => {
      try {
        console.log('🔄 Initializing IAP Connection...');
        await RNIap.initConnection();
        console.log('✅ IAP Connection Initialized');

        console.log('🔍 Fetching Subscriptions with IDs:', productIds);
        const availableProducts = await RNIap.getSubscriptions({
          skus: productIds,
        });

        if (availableProducts.length === 0) {
          console.warn('⚠️ No subscriptions found. Check product IDs.');
        } else {
          console.log('✅ Available Subscriptions:', availableProducts);
          setProducts(availableProducts);
        }
      } catch (error) {
        console.error('❌ IAP Initialization Error:', error);
        Alert.alert('Error', 'Failed to fetch IAP products.');
      }
    };

    initIAP();
    return () => RNIap.endConnection(); // Clean up
  }, []);

  return (
    <View style={{padding: 100}}>
      <Text>Available Subscriptions:</Text>
      {products.length > 0 ? (
        products.map(product => (
          <View key={product.productId} style={{marginBottom: 10}}>
            <Text>{product.title}</Text>
            <Text>{product.localizedPrice}</Text>
            <Button
              title="Subscribe"
              onPress={() => console.log(`Buying ${product.productId}`)}
            />
          </View>
        ))
      ) : (
        <Text>🔄 Loading Subscriptions...</Text>
      )}
    </View>
  );
};

export default IAPScreen;
