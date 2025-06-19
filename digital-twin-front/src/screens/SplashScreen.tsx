import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApiUrl } from '../context/ApiUrlContext';
import logo from '../../assets/logo.png';

const SplashScreen = () => {
  const navigation = useNavigation();
  const { apiUrl } = useApiUrl();

  useEffect(() => {
    const checkApiUrlAndNavigate = async () => {
      if (!apiUrl || !apiUrl.startsWith('http')) {
        navigation.replace('Config');
      }
    };

    checkApiUrlAndNavigate();
  }, [apiUrl, navigation]);

  const handleStart = () => {
    if (!apiUrl || !apiUrl.startsWith('http')) {
      alert('URL da API não configurada ou inválida. Por favor, configure-a.');
      navigation.navigate('Config');
      return;
    }
    navigation.navigate('SensorList');
  };

  const handleConfig = () => {
    navigation.navigate('Config');
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logoImage} resizeMode="contain" />
      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.configButton} onPress={handleConfig}>
        <Text style={styles.configButtonText}>Configurar API</Text>
      </TouchableOpacity>
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
  startButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  configButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  configButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
