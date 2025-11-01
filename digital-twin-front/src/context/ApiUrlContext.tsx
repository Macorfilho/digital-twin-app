import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ApiUrlContextProps {
  apiUrl: string;
  setApiUrl: (url: string) => void;
}

const ApiUrlContext = createContext<ApiUrlContextProps | undefined>(undefined);

interface ApiUrlProviderProps {
  children: ReactNode;
}

export const ApiUrlProvider: React.FC<ApiUrlProviderProps> = ({ children }) => {
  const [apiUrl, setApiUrlState] = useState<string>('http://localhost:8080');

  useEffect(() => {
    const loadApiUrl = async () => {
      try {
        const savedUrl = await AsyncStorage.getItem('apiUrl');
        if (savedUrl) {
          setApiUrlState(savedUrl);
        }
      } catch (error) {
        console.error('Erro ao carregar URL da API:', error);
      }
    };

    loadApiUrl();
  }, []);

  const setApiUrl = async (newUrl: string) => {
    setApiUrlState(newUrl);
    try {
      await AsyncStorage.setItem('apiUrl', newUrl);
    } catch (error) {
      console.error('Erro ao salvar URL da API:', error);
    }
  };

  return (
    <ApiUrlContext.Provider value={{ apiUrl, setApiUrl }}>
      {children}
    </ApiUrlContext.Provider>
  );
};

export const useApiUrl = () => {
  const context = useContext(ApiUrlContext);
  if (!context) {
    throw new Error('useApiUrl deve ser usado dentro de um ApiUrlProvider');
  }
  return context;
};