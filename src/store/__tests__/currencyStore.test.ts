import { act, renderHook } from '@testing-library/react-hooks';
import { CurrencyInfo } from 'src/models/CurrencyInfo';
import { INITIAL_DATA } from 'src/models/sampleData';
import { useCurrencyStore } from 'src/store/currencyStore';
import { storage } from 'src/utils/storage';

jest.mock('src/utils/storage', () => ({
  storage: {
    saveCurrencies: jest.fn(),
    loadCurrencies: jest.fn(),
  },
}));

jest.mock('src/utils/currencyGenerator', () => ({
  generateRandomCurrency: () => ({
    id: 'MOCK',
    name: 'Mock Currency',
    symbol: 'MOCK',
  }),
}));

describe('currencyStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the store to initial state
    const { result } = renderHook(() => useCurrencyStore());
    act(() => {
      result.current.clearCurrencies();
    });
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() => useCurrencyStore());
      
      expect(result.current.rawCurrencies).toEqual([]);
      expect(result.current.filter).toBe('all');
      expect(result.current.currencies).toEqual([]);
      expect(result.current.isLoading).toBe(true);
    });
  });

  describe('initializeStore', () => {
    it('should initialize with saved currencies if available', async () => {
      const mockSavedCurrencies: CurrencyInfo[] = [
        { id: '1', name: 'Test Currency', symbol: 'TEST' }
      ];
      (storage.loadCurrencies as jest.Mock).mockResolvedValue(mockSavedCurrencies);

      const { result } = renderHook(() => useCurrencyStore());
      await act(async () => {
        await result.current.initializeStore();
      });

      expect(result.current.rawCurrencies).toEqual(mockSavedCurrencies);
      expect(result.current.currencies).toEqual(mockSavedCurrencies);
      expect(result.current.isLoading).toBe(false);
    });

    it('should initialize with initial data if no saved currencies', async () => {
      (storage.loadCurrencies as jest.Mock).mockResolvedValue(null);

      const { result } = renderHook(() => useCurrencyStore());
      await act(async () => {
        await result.current.initializeStore();
      });

      expect(result.current.rawCurrencies).toEqual(INITIAL_DATA);
      expect(result.current.currencies).toEqual(INITIAL_DATA);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('clearCurrencies', () => {
    it('should clear all currencies and save empty array', () => {
      const { result } = renderHook(() => useCurrencyStore());
      
      act(() => {
        result.current.resetData(); // First add some data
        result.current.clearCurrencies(); // Then clear it
      });

      expect(result.current.rawCurrencies).toEqual([]);
      expect(result.current.currencies).toEqual([]);
      expect(storage.saveCurrencies).toHaveBeenCalledWith([]);
    });
  });

  describe('insertRandomCurrency', () => {
    it('should add random currency and save to storage', () => {
      const { result } = renderHook(() => useCurrencyStore());
      
      act(() => {
        result.current.insertRandomCurrency();
      });

      expect(result.current.rawCurrencies).toHaveLength(1);
      expect(result.current.rawCurrencies[0]).toEqual({
        id: 'MOCK',
        name: 'Mock Currency',
        symbol: 'MOCK',
      });
      expect(storage.saveCurrencies).toHaveBeenCalled();
    });

    it('should maintain filter when adding currency', () => {
      const { result } = renderHook(() => useCurrencyStore());
      
      act(() => {
        result.current.setFilter('crypto');
        result.current.insertRandomCurrency();
      });

      expect(result.current.filter).toBe('crypto');
      expect(result.current.currencies).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 'MOCK',
            name: 'Mock Currency',
            symbol: 'MOCK',
          })
        ])
      );
    });
  });

  describe('resetData', () => {
    it('should reset raw currencies to initial data and save', () => {
      const { result } = renderHook(() => useCurrencyStore());
      
      act(() => {
        result.current.resetData();
      });

      expect(result.current.rawCurrencies).toEqual(INITIAL_DATA);
      expect(storage.saveCurrencies).toHaveBeenCalledWith(INITIAL_DATA);
    });

    it('should apply current filter to reset data', () => {
      const { result } = renderHook(() => useCurrencyStore());
      
      act(() => {
        result.current.setFilter('crypto');
        result.current.resetData();
      });

      expect(result.current.filter).toBe('crypto');
      expect(result.current.currencies.length).toBeLessThan(INITIAL_DATA.length);
      expect(result.current.currencies.every((c: CurrencyInfo) => !('code' in c))).toBe(true);
    });

    it('should show all currencies when filter is all', () => {
      const { result } = renderHook(() => useCurrencyStore());
      
      act(() => {
        result.current.setFilter('all');
        result.current.resetData();
      });

      expect(result.current.filter).toBe('all');
      expect(result.current.currencies).toEqual(INITIAL_DATA);
    });
  });

  describe('setFilter', () => {
    beforeEach(() => {
      const { result } = renderHook(() => useCurrencyStore());
      act(() => {
        result.current.resetData();
      });
    });

    it('should filter crypto currencies', () => {
      const { result } = renderHook(() => useCurrencyStore());
      
      act(() => {
        result.current.setFilter('crypto');
      });

      expect(result.current.filter).toBe('crypto');
      expect(result.current.currencies.every((c: CurrencyInfo) => !('code' in c))).toBe(true);
    });

    it('should filter fiat currencies', () => {
      const { result } = renderHook(() => useCurrencyStore());
      
      act(() => {
        result.current.setFilter('fiat');
      });

      expect(result.current.filter).toBe('fiat');
      expect(result.current.currencies.every((c: CurrencyInfo) => 'code' in c)).toBe(true);
    });

    it('should show all currencies when filter is all', () => {
      const { result } = renderHook(() => useCurrencyStore());
      
      act(() => {
        result.current.setFilter('all');
      });

      expect(result.current.filter).toBe('all');
      expect(result.current.currencies).toEqual(result.current.rawCurrencies);
    });
  });
}); 