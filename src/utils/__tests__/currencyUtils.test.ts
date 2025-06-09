import { CurrencyInfo } from 'src/models/CurrencyInfo';
import { filterCurrencies, isCryptoCurrency } from 'src/utils/currencyUtils';

describe('currencyUtils', () => {
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
    },
    {
      id: '3',
      name: 'Ethereum',
      symbol: 'ETH',
    }
  ];

  describe('isCryptoCurrency', () => {
    it('should identify crypto currencies correctly', () => {
      expect(isCryptoCurrency(mockCurrencies[0])).toBe(true); // Bitcoin
      expect(isCryptoCurrency(mockCurrencies[2])).toBe(true); // Ethereum
    });

    it('should identify fiat currencies correctly', () => {
      expect(isCryptoCurrency(mockCurrencies[1])).toBe(false); // USD
    });
  });

  describe('filterCurrencies', () => {
    it('should return all currencies when filter is "all"', () => {
      const result = filterCurrencies(mockCurrencies, 'all');
      expect(result).toEqual(mockCurrencies);
    });

    it('should return only crypto currencies when filter is "crypto"', () => {
      const result = filterCurrencies(mockCurrencies, 'crypto');
      expect(result).toHaveLength(2);
      expect(result.every(isCryptoCurrency)).toBe(true);
      expect(result.map(c => c.symbol)).toEqual(['BTC', 'ETH']);
    });

    it('should return only fiat currencies when filter is "fiat"', () => {
      const result = filterCurrencies(mockCurrencies, 'fiat');
      expect(result).toHaveLength(1);
      expect(result.every(c => !isCryptoCurrency(c))).toBe(true);
      expect(result[0].code).toBe('USD');
    });
  });
}); 