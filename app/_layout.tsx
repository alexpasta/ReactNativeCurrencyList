import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useCurrencyStore } from './store/currencyStore';


export default function RootLayout() {
  const initializeStore = useCurrencyStore((state: any) => state.initializeStore);
  const isLoading = useCurrencyStore((state: any) => state.isLoading);

  useEffect(() => {
    initializeStore();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#fff' },
        }}
      />
    </SafeAreaProvider>
  );
}
