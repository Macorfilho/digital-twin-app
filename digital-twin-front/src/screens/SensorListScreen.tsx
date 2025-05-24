import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import sensorsData from '../mock/sensors.json';
import { useNavigation } from '@react-navigation/native';

interface Sensor {
  id: string;
  name: string;
  unit: string;
  currentValue: number;
  status: 'OK' | 'Alerta';
  history: number[];
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
  const sensors = sensorsData as Sensor[];

  const handleSensorPress = (sensor: Sensor) => {
    navigation.navigate('SensorDetail', { sensor });
  };

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
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    marginTop: 5,
  },
});

export default SensorListScreen;