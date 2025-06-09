import AsyncStorage from '@react-native-async-storage/async-storage';
import { CurrencyInfo } from 'src/models/CurrencyInfo';
import { storage } from '../storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  clear: jest.fn(),
}));

describe('storage', () => {
  const mockCurrencies: CurrencyInfo[] = [
    {
      id: '1',
      name: 'Bitcoin',
      symbol: 'BTC',
    },
    {
      id: '2',
      name: 'US Dollar',
      symbol: '$',
      code: 'USD',
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveCurrencies', () => {
    it('should save currencies to AsyncStorage', async () => {
      await storage.saveCurrencies(mockCurrencies);
      
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@currency_list/currencies',
        JSON.stringify(mockCurrencies)
      );
    });

    it('should handle errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const error = new Error('Storage error');
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(error);

      await storage.saveCurrencies(mockCurrencies);
      
      expect(consoleSpy).toHaveBeenCalledWith('Error saving currencies:', error);
      consoleSpy.mockRestore();
    });
  });

  describe('loadCurrencies', () => {
    it('should load currencies from AsyncStorage', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockCurrencies)
      );

      const result = await storage.loadCurrencies();
      
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@currency_list/currencies');
      expect(result).toEqual(mockCurrencies);
    });

    it('should return null when no data exists', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const result = await storage.loadCurrencies();
      
      expect(result).toBeNull();
    });

    it('should handle errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const error = new Error('Storage error');
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(error);

      const result = await storage.loadCurrencies();
      
      expect(consoleSpy).toHaveBeenCalledWith('Error loading currencies:', error);
      expect(result).toBeNull();
      consoleSpy.mockRestore();
    });
  });

  describe('clearAll', () => {
    it('should clear all data from AsyncStorage', async () => {
      await storage.clearAll();
      
      expect(AsyncStorage.clear).toHaveBeenCalled();
    });

    it('should handle errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const error = new Error('Storage error');
      (AsyncStorage.clear as jest.Mock).mockRejectedValueOnce(error);

      await storage.clearAll();
      
      expect(consoleSpy).toHaveBeenCalledWith('Error clearing storage:', error);
      consoleSpy.mockRestore();
    });
  });
}); 