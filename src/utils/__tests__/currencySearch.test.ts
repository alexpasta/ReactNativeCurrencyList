import { CurrencyInfo } from 'src/models/CurrencyInfo';
import { getSearchHint, searchCurrencies } from 'src/utils/currencySearch';

describe('searchCurrencies', () => {
  const mockCurrencies: CurrencyInfo[] = [
    {
      id: '1',
      name: 'United States Dollar',
      symbol: '$',
      code: 'USD'
    },
    {
      id: '2',
      name: 'Euro',
      symbol: '€',
      code: 'EUR'
    },
    {
      id: '3',
      name: 'Japanese Yen',
      symbol: '¥',
      code: 'JPY'
    }
  ];

  it('should return all currencies when search term is empty', () => {
    const result = searchCurrencies(mockCurrencies, '');
    expect(result).toEqual(mockCurrencies);
  });

  it('should find currency by name', () => {
    const result = searchCurrencies(mockCurrencies, 'euro');
    expect(result).toHaveLength(1);
    expect(result[0].code).toBe('EUR');
  });

  it('should find currency by symbol', () => {
    const result = searchCurrencies(mockCurrencies, '$');
    expect(result).toHaveLength(1);
    expect(result[0].code).toBe('USD');
  });

  it('should find currency by code', () => {
    const result = searchCurrencies(mockCurrencies, 'jpy');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Japanese Yen');
  });

  it('should be case insensitive', () => {
    const result = searchCurrencies(mockCurrencies, 'EURO');
    expect(result).toHaveLength(1);
    expect(result[0].code).toBe('EUR');
  });

  it('should return multiple results for partial matches', () => {
    const result = searchCurrencies(mockCurrencies, 'e');
    expect(result.length).toBeGreaterThan(1);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 'EUR' }),
        expect.objectContaining({ name: 'Japanese Yen' })
      ])
    );
  });

  it('should return empty array when no matches found', () => {
    const result = searchCurrencies(mockCurrencies, 'xyz');
    expect(result).toHaveLength(0);
  });
});

describe('getSearchHint', () => {
  const mockCurrencies: CurrencyInfo[] = [
    {
      id: '1',
      name: 'United States Dollar',
      symbol: '$',
      code: 'USD'
    },
    {
      id: '2',
      name: 'Euro',
      symbol: '€',
      code: 'EUR'
    },
    {
      id: '3',
      name: 'Bitcoin',
      symbol: 'BTC'
    }
  ];

  it('should return hint with first currency code when available', () => {
    const result = getSearchHint(mockCurrencies);
    expect(result).toBe('Try "USD"');
  });

  it('should return hint with first currency symbol when no code available', () => {
    const currenciesWithoutCode: CurrencyInfo[] = [
      {
        id: '1',
        name: 'Bitcoin',
        symbol: 'BTC'
      }
    ];
    
    const result = getSearchHint(currenciesWithoutCode);
    expect(result).toBe('Try "BTC"');
  });

  it('should return empty string when currencies array is empty', () => {
    const result = getSearchHint([]);
    expect(result).toBe('');
  });

  it('should return empty string when first currency has no code or symbol', () => {
    const currenciesWithoutCodeOrSymbol: CurrencyInfo[] = [
      {
        id: '1',
        name: 'Unknown Currency',
        symbol: ''
      }
    ];
    
    const result = getSearchHint(currenciesWithoutCodeOrSymbol);
    expect(result).toBe('');
  });
}); 