import AsyncStorage from '@react-native-async-storage/async-storage';
import { CurrencyInfo } from 'app/models/CurrencyInfo';

const STORAGE_KEYS = {
  CURRENCIES: '@currency_list/currencies',
} as const;

export const storage = {
  saveCurrencies: async (currencies: CurrencyInfo[]): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(currencies);
      await AsyncStorage.setItem(STORAGE_KEYS.CURRENCIES, jsonValue);
    } catch (error) {
      console.error('Error saving currencies:', error);
    }
  },

  loadCurrencies: async (): Promise<CurrencyInfo[] | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.CURRENCIES);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error loading currencies:', error);
      return null;
    }
  },

  clearAll: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
}; 