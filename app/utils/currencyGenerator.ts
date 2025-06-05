import { CurrencyInfo } from 'app/models/CurrencyInfo';

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

export const generateRandomCurrency = (): CurrencyInfo => {
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