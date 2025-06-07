import { CurrencyInfo } from 'app/models/CurrencyInfo';
import { INITIAL_DATA } from 'app/models/sampleData';
import { generateRandomCurrency } from 'app/utils/currencyGenerator';
import { filterCurrencies } from 'app/utils/currencyUtils';
import { storage } from 'app/utils/storage';
import { create } from 'zustand';

export type CurrencyFilterType = 'all' | 'crypto' | 'fiat';

interface CurrencyStore {
  // State
  rawCurrencies: CurrencyInfo[];
  filter: CurrencyFilterType;
  currencies: CurrencyInfo[];
  isLoading: boolean;
  
  // Actions
  clearCurrencies: () => void;
  insertRandomCurrency: () => void;
  resetData: () => void;
  setFilter: (filter: CurrencyFilterType) => void;
  initializeStore: () => Promise<void>;
}

export const useCurrencyStore = create<CurrencyStore>((set, get) => ({
  // State
  rawCurrencies: [],
  filter: 'all',
  currencies: [],
  isLoading: true,
  
  // Actions
  clearCurrencies: () => {
    set({ 
      rawCurrencies: [],
      currencies: []
    });
    storage.saveCurrencies([]);
  },
  
  insertRandomCurrency: () => {
    const newCurrency = generateRandomCurrency();
    const currentCurrencies = get().rawCurrencies;
    const newRawCurrencies = [...currentCurrencies, newCurrency];
    const filter = get().filter;
    
    set({ 
      rawCurrencies: newRawCurrencies,
      currencies: filterCurrencies(newRawCurrencies, filter)
    });
    storage.saveCurrencies(newRawCurrencies);
  },

  resetData: () => {
    const filter = get().filter;
    set({ 
      rawCurrencies: INITIAL_DATA,
      currencies: filterCurrencies(INITIAL_DATA, filter)
    });
    storage.saveCurrencies(INITIAL_DATA);
  },

  setFilter: (filter) => {
    const rawCurrencies = get().rawCurrencies;
    set({ 
      filter,
      currencies: filterCurrencies(rawCurrencies, filter)
    });
  },

  initializeStore: async () => {
    const savedCurrencies = await storage.loadCurrencies();
    const initialCurrencies = savedCurrencies || INITIAL_DATA;
    set({ 
      rawCurrencies: initialCurrencies,
      currencies: initialCurrencies,
      isLoading: false
    });
  },
})); 