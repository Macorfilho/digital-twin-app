import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApiUrl } from '../context/ApiUrlContext'; 

interface Sensor {
  id: string;
  name: string;
  unit: string;
  currentValue: number;
  status: 'OK' | 'Alerta';
}

const SensorItem = ({ sensor }: { sensor: Sensor }) => (
  <View style={styles.item}>
    <Text style={styles.name}>{sensor.name}</Text>
    <View style={styles.details}>
      <Text>Valor: {sensor.currentValue} {sensor.unit}</Text>
      <Text>Status: <Text style={{ color: sensor.status === 'OK' ? 'green' : 'red' }}>{sensor.status}</Text></Text>
    </View>
  </View>
);

const SensorListScreen: React.FC = () => {
  const navigation = useNavigation();
  const { apiUrl } = useApiUrl(); 
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSensors = async () => {
      // Verificar se a URL da API está configurada
      if (!apiUrl) {
        console.warn('API URL not set. Please configure it in the settings.');
        setError('URL da API não configurada. Por favor, vá para Configurações.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null); 

        const response = await fetch(`${apiUrl}/sensors`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Erro HTTP! Status: ${response.status}. Detalhes: ${errorText || 'N/A'}`);
        }
        const data: Sensor[] = await response.json();
        setSensors(data);
      } catch (err: any) {
        console.error('Erro ao buscar sensores:', err);
        setError(`Falha ao carregar sensores: ${err.message}`);
        Alert.alert('Erro de Conexão', `Não foi possível carregar os dados dos sensores. Verifique a URL da API nas configurações.`);
      } finally {
        setLoading(false);
      }
    };

    fetchSensors();
  }, [apiUrl]);

  const handleSensorPress = (sensor: Sensor) => {
    navigation.navigate('SensorDetail', { sensor });
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Carregando sensores...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => navigation.navigate('Config')}>
          <Text style={styles.retryButtonText}>Ir para Configurações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.retryButton} onPress={() => { setLoading(true); setError(null); }}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (sensors.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Nenhum sensor encontrado.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => navigation.navigate('Config')}>
          <Text style={styles.retryButtonText}>Verificar Configurações da API</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sensors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSensorPress(item)}>
            <SensorItem sensor={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
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

export default SensorListScreen;