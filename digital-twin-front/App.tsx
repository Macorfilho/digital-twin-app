import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { ApiUrlProvider } from './src/context/ApiUrlContext';

export default function App() {
  return (
    <ApiUrlProvider>
      <AppNavigator />
    </ApiUrlProvider>
  );
}