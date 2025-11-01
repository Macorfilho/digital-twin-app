import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApiUrl } from '../context/ApiUrlContext';

const SensorDetailScreen = ({ route }) => {
  const { sensor } = route.params;
  const navigation = useNavigation();
  const { apiUrl } = useApiUrl();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    const fetchReadings = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (!apiUrl) {
        setError('API URL not configured. Please go to Settings.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/api/readings/${sensor.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 401 || response.status === 403) {
          Alert.alert('Session Expired', 'Your session has expired. Please log in again.');
          // navigation.replace('Login'); // Uncomment if you want to redirect to Login
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch readings.');
        }

        const data = await response.json();
        setReadings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReadings();
  }, [apiUrl, sensor.id]);

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading readings...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Try Again" onPress={() => { setLoading(true); setError(null); /* Refetch */ }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{sensor.name}</Text>
      <Text style={styles.details}>ID: {sensor.id}</Text>
      <Text style={styles.details}>Unit: {sensor.unit}</Text>
      <Text style={styles.details}>Current Value: {sensor.currentValue}</Text>
      <Text style={styles.details}>Status: {sensor.status}</Text>
      
      <Text style={styles.subtitle}>Readings History</Text>
      <FlatList
        data={readings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.readingItem}>
            <Text>Value: {item.value} {sensor.unit}</Text>
            <Text>Timestamp: {new Date(item.timestamp).toLocaleString()}</Text>
          </View>
        )}
      />

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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  details: {
    fontSize: 18,
    marginBottom: 10,
  },
  readingItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default SensorDetailScreen;
