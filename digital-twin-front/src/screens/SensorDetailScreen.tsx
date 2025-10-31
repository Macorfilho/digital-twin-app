import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SensorDetailScreen = ({ route }) => {
  const { sensor } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{sensor.name}</Text>
      <Text style={styles.details}>ID: {sensor.id}</Text>
      <Text style={styles.details}>Unit: {sensor.unit}</Text>
      <Text style={styles.details}>Current Value: {sensor.currentValue}</Text>
      <Text style={styles.details}>Status: {sensor.status}</Text>
      <Button title="Back to List" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  details: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default SensorDetailScreen;
