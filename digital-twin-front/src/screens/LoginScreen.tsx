import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApiUrl } from '../context/ApiUrlContext';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { apiUrl } = useApiUrl();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!apiUrl) {
      Alert.alert('Erro', 'A URL da API não está configurada.');
      return;
    }
    if (!username || !password) {
      Alert.alert('Erro', 'Por favor, preencha o usuário e a senha.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('userToken', data.token);
        navigation.navigate('SensorList');
      } else {
        const errorData = await response.text();
        Alert.alert('Falha no Login', `Credenciais inválidas ou erro no servidor. Detalhes: ${errorData}`);
      }
    } catch (error: any) {
      Alert.alert('Erro de Rede', `Não foi possível conectar à API: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Usuário"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.configButton} onPress={() => navigation.navigate('Config')}>
        <Text style={styles.configButtonText}>Ir para Configurações</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  configButton: {
    marginTop: 20,
  },
  configButtonText: {
    color: '#007bff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LoginScreen;
