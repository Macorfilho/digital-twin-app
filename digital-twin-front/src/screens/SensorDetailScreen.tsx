import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Dimensions } from 'react-native';

interface SensorDetailRouteParams {
  sensor: {
    id: string;
    name: string;
    unit: string;
    currentValue: number;
    status: 'OK' | 'Alerta';
    history: number[];
  };
}

interface SensorDetailScreenProps {
  route: { params: SensorDetailRouteParams };
}

const SensorDetailScreen: React.FC<SensorDetailScreenProps> = ({ route }) => {
  const { sensor } = route.params;

  const renderHistoryItem = ({ item }: { item: number }) => (
    <Text style={styles.historyItem}>{item} {sensor.unit}</Text>
  );

  const handleUpdate = () => {
    alert('Atualizar dados do sensor!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{sensor.name}</Text>
      <Text style={styles.currentValue}>Valor Atual: {sensor.currentValue} {sensor.unit}</Text>
      <Text style={{ color: sensor.status === 'OK' ? 'green' : 'red', fontWeight: 'bold' }}>Status: {sensor.status}</Text>

      <View style={styles.historyListContainer}>
        <Text style={styles.subtitle}>Histórico em Lista:</Text>
        <FlatList
          data={sensor.history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderHistoryItem}
        />
      </View>

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
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  historyListContainer: {
    marginBottom: 20,
  },
  historyItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
});

export default SensorDetailScreen;