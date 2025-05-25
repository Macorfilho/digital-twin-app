import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

interface SensorDetailRouteParams {
  sensor: {
    id: string;
    name: string;
    unit: string;
    currentValue: number;
    status: 'OK' | 'Alerta';
  };
}

interface SensorDetailScreenProps {
  route: { params: SensorDetailRouteParams };
}

interface Reading {
  id: number;
  sensorId: string;
  value: number;
  timestamp: string;
}

const SensorDetailScreen: React.FC<SensorDetailScreenProps> = ({ route }) => {
  const { sensor } = route.params;
  const [readings, setReadings] = useState<Reading[]>([]);
  const API_BASE_URL = 'http://localhost:8080/api';
  const navigation = useNavigation();

  useEffect(() => {
    const fetchReadings = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/readings/${sensor.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Reading[] = await response.json();
        setReadings(data);
      } catch (error) {
        console.error('Erro ao buscar leituras:', error);
        // Adicione tratamento de erro adequado aqui
      }
    };

    fetchReadings();
  }, [sensor.id]);

  const renderReadingItem = ({ item }: { item: Reading }) => (
    <View style={styles.readingItem}>
      <Text>Valor: {item.value}</Text>
      <Text>Timestamp: {new Date(item.timestamp).toLocaleString()}</Text>
    </View>
  );

  const handleUpdate = () => {
    alert('Atualizar dados do sensor!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{sensor.name}</Text>
      <Text style={styles.currentValue}>Valor Atual: {sensor.currentValue} {sensor.unit}</Text>
      <Text style={{ color: sensor.status === 'OK' ? 'green' : 'red', fontWeight: 'bold' }}>Status: {sensor.status}</Text>

      <Text style={styles.subtitle}>Leituras:</Text>
      <FlatList
        data={readings}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        renderItem={renderReadingItem}
      />

      <Button title="Atualizar" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  currentValue: {
    fontSize: 18,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  readingItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
  },
});

export default SensorDetailScreen;