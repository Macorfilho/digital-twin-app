import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, ActivityIndicator, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useApiUrl } from '../context/ApiUrlContext'; // Import useApiUrl

// Definição do tipo para os parâmetros de rota
type SensorDetailRouteParams = {
  sensor: {
    id: string; // ou number, dependendo do seu backend
    name: string;
    unit: string;
    currentValue: number;
    status: 'OK' | 'Alerta';
  };
};

// Definição do tipo para a rota
type SensorDetailScreenRouteProp = RouteProp<{ SensorDetail: SensorDetailRouteParams }, 'SensorDetail'>;

interface Reading {
  id: number; // ou string, consistente com seu backend
  sensorId: string;
  value: number;
  timestamp: string;
}

const SensorDetailScreen: React.FC = () => {
  const route = useRoute<SensorDetailScreenRouteProp>();
  const navigation = useNavigation();
  const { sensor } = route.params;
  const { apiUrl } = useApiUrl(); // Use the apiUrl from the context!
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReadings = async () => {
      if (!apiUrl) {
        setError('URL da API não configurada. Por favor, configure-a.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Use the apiUrl from the context!
        const response = await fetch(`${apiUrl}/readings/${sensor.id}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Erro ao buscar leituras: Status ${response.status}. Detalhes: ${errorText || 'N/A'}`);
        }
        const data: Reading[] = await response.json();
        setReadings(data);
      } catch (err: any) {
        console.error('Erro ao buscar leituras:', err);
        setError(`Não foi possível carregar as leituras: ${err.message}`);
        Alert.alert('Erro', `Falha ao carregar leituras do sensor. Detalhes: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchReadings();
  }, [apiUrl, sensor.id]);

  const renderReadingItem = ({ item }: { item: Reading }) => (
    <View style={styles.readingItem}>
      <Text>Valor: {item.value}</Text>
      <Text>Timestamp: {new Date(item.timestamp).toLocaleString()}</Text>
    </View>
  );

  const handleUpdate = () => {
    alert('Atualizar dados do sensor!');
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Carregando leituras...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.retryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{sensor.name}</Text>
      <Text style={styles.currentValue}>Valor Atual: {sensor.currentValue} {sensor.unit}</Text>
      <Text style={{ color: sensor.status === 'OK' ? 'green' : 'red', fontWeight: 'bold' }}>Status: {sensor.status}</Text>

      <Text style={styles.subtitle}>Leituras:</Text>
      <FlatList
        data={readings}
        keyExtractor={(item) => item.id.toString()} // Use item.id directly, assuming it's a unique number or string
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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SensorDetailScreen;