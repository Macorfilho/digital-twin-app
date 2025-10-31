import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SensorListScreen from '../screens/SensorListScreen';
import SensorDetailScreen from '../screens/SensorDetailScreen';
import SplashScreen from '../screens/SplashScreen';
import ConfigScreen from '../screens/ConfigScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Config" component={ConfigScreen} options={{ title: 'Configurações' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SensorList" component={SensorListScreen} options={{ title: 'Lista de Sensores' }} />
        <Stack.Screen name="SensorDetail" component={SensorDetailScreen} options={{ title: 'Detalhes do Sensor' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;