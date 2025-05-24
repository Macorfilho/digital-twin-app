import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const ConfigScreen = ({ navigation }: { navigation: any }) => {
  const [apiUrl, setApiUrl] = useState('http://localhost:3000'); // Valor inicial
  // Aqui você pode adicionar lógica para carregar uma URL salva anteriormente

  const handleSave = () => {
    // Aqui você salvaria a URL (por exemplo, em AsyncStorage)
    console.log('URL da API salva:', apiUrl);
    navigation.navigate('Splash'); // Volta para a tela de Splash/Login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações da API</Text>
      <Text style={styles.label}>URL da API:</Text>
      <TextInput
        style={styles.input}
        value={apiUrl}
        onChangeText={setApiUrl}
        placeholder="Digite a URL da API"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfigScreen;