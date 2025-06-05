import { CurrencyInfo } from 'app/models/CurrencyInfo';
import { searchCurrencies } from '../currencySearch';

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