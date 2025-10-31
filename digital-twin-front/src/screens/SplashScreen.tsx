import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApiUrl } from '../context/ApiUrlContext';
import logo from '../../assets/logo.png';

const SplashScreen = () => {
  const navigation = useNavigation();
  const { apiUrl } = useApiUrl();

  useEffect(() => {
    const checkAuth = async () => {
      // Wait for a bit to show the splash screen
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (!apiUrl || !apiUrl.startsWith('http')) {
        navigation.replace('Config');
        return;
      }

      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          navigation.replace('SensorList');
        } else {
          navigation.replace('Login');
        }
      } catch (e) {
        console.error('Failed to load token', e);
        navigation.replace('Login');
      }
    };

    checkAuth();
  }, [apiUrl, navigation]);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logoImage} resizeMode="contain" />
      <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  logoImage: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
});

export default SplashScreen;
