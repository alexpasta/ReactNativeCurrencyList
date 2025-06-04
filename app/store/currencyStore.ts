import { create } from 'zustand';
import { CurrencyInfo } from '../models/CurrencyInfo';
import { storage } from '../utils/storage';

// Sample data
export const CRYPTO_CURRENCIES: CurrencyInfo[] = [
  { id: "BTC", name: "Bitcoin", symbol: "BTC" },
  { id: "ETH", name: "Ethereum", symbol: "ETH" },
  { id: "XRP", name: "XRP", symbol: "XRP" },
  { id: "BCH", name: "Bitcoin Cash", symbol: "BCH" },
  { id: "LTC", name: "Litecoin", symbol: "LTC" },
  { id: "EOS", name: "EOS", symbol: "EOS" },
  { id: "BNB", name: "Binance Coin", symbol: "BNB" },
  { id: "LINK", name: "Chainlink", symbol: "LINK" },
  { id: "NEO", name: "NEO", symbol: "NEO" },
  { id: "ETC", name: "Ethereum Classic", symbol: "ETC" },
  { id: "ONT", name: "Ontology", symbol: "ONT" },
  { id: "CRO", name: "Crypto.com Chain", symbol: "CRO" },
  { id: "CUC", name: "Cucumber", symbol: "CUC" },
  { id: "USDC", name: "USD Coin", symbol: "USDC" },
];

export const FIAT_CURRENCIES: CurrencyInfo[] = [
  { id: "SGD", name: "Singapore Dollar", symbol: "$", code: "SGD" },
  { id: "EUR", name: "Euro", symbol: "€", code: "EUR" },
  { id: "GBP", name: "British Pound", symbol: "£", code: "GBP" },
];

// Initial data state
const INITIAL_DATA = [...CRYPTO_CURRENCIES, ...FIAT_CURRENCIES];

// Helper data for random generation
const CURRENCY_SYMBOLS = ['$', '€', '£', '¥', '₹', '₪', '₩', '₴', '₽'];
const SAMPLE_NAMES = [
  // Crypto names
  'Solar', 'Quantum', 'Nexus', 'Phoenix', 'Dragon', 'Titan', 'Atlas', 'Nova',
  'Omega', 'Alpha', 'Delta', 'Sigma', 'Vector', 'Cyber', 'Meta', 'Hyper',
  // Country names
  'Northern', 'Southern', 'Eastern', 'Western', 'United', 'Federal', 'Republic',
  'Kingdom', 'State', 'Empire', 'Union', 'Commonwealth', 'Democratic', 'Central'
];

// Helper functions
const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  return Array.from({ length }, () => getRandomElement(characters)).join('');
};

const generateRandomCurrency = (): CurrencyInfo => {
  const isCrypto = Math.random() < 0.5;
  const randomName = getRandomElement(SAMPLE_NAMES);

  if (isCrypto) {
    const symbol = generateRandomString(3);
    return {
      id: symbol,
      name: `${randomName} Coin`,
      symbol,
    };
  } else {
    const code = generateRandomString(3);
    return {
      id: code,
      name: `${randomName} Currency`,
      symbol: getRandomElement(CURRENCY_SYMBOLS),
      code,
    };
  }
};

// Currency type check
const isCryptoCurrency = (currency: CurrencyInfo): boolean => {
  return !('code' in currency);
};

export type CurrencyFilter = 'all' | 'crypto' | 'fiat';

interface CurrencyStore {
  // State
  rawCurrencies: CurrencyInfo[];
  filter: CurrencyFilter;
  currencies: CurrencyInfo[];
  isLoading: boolean;
  
  // Actions
  setCurrencies: (currencies: CurrencyInfo[]) => void;
  clearCurrencies: () => void;
  insertRandomCurrency: () => void;
  resetData: () => void;
  setFilter: (filter: CurrencyFilter) => void;
  initializeStore: () => Promise<void>;
}

export const useCurrencyStore = create<CurrencyStore>((set, get) => ({
  // State
  rawCurrencies: [],
  filter: 'all',
  currencies: [],
  isLoading: true,
  
  // Actions
  setCurrencies: (currencies) => {
    set({ 
      rawCurrencies: currencies,
      currencies: currencies 
    });
    storage.saveCurrencies(currencies);
  },
  
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
      currencies: filter === 'all' 
        ? newRawCurrencies
        : filter === 'crypto'
        ? newRawCurrencies.filter(isCryptoCurrency)
        : newRawCurrencies.filter(currency => !isCryptoCurrency(currency))
    });
    storage.saveCurrencies(newRawCurrencies);
  },

  resetData: () => {
    set({ 
      rawCurrencies: INITIAL_DATA,
      currencies: INITIAL_DATA
    });
    storage.saveCurrencies(INITIAL_DATA);
  },

  setFilter: (filter) => {
    const rawCurrencies = get().rawCurrencies;
    set({ 
      filter,
      currencies: filter === 'all' 
        ? rawCurrencies
        : filter === 'crypto'
        ? rawCurrencies.filter(isCryptoCurrency)
        : rawCurrencies.filter(currency => !isCryptoCurrency(currency))
    });
  },

  initializeStore: async () => {
    const savedCurrencies = await storage.loadCurrencies();
    set({ 
      rawCurrencies: savedCurrencies || INITIAL_DATA,
      currencies: savedCurrencies || INITIAL_DATA,
      isLoading: false
    });
  },
})); 