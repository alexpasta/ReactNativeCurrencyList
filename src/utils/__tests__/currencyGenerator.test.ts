import { generateRandomCurrency } from 'src/utils/currencyGenerator';

describe('currencyGenerator', () => {
  describe('generateRandomCurrency', () => {
    it('should generate valid currency objects', () => {
      const currency = generateRandomCurrency();
      
      expect(currency).toHaveProperty('id');
      expect(currency).toHaveProperty('name');
      expect(currency).toHaveProperty('symbol');
      expect(typeof currency.id).toBe('string');
      expect(typeof currency.name).toBe('string');
      expect(typeof currency.symbol).toBe('string');
    });

    it('should generate different currencies on multiple calls', () => {
      const currencies = Array.from({ length: 5 }, () => generateRandomCurrency());
      const uniqueIds = new Set(currencies.map(c => c.id));
      expect(uniqueIds.size).toBe(5);
    });

    it('should generate valid crypto currency format', () => {
      // Mock Math.random to always return 0.2 (< 0.5 for crypto)
      const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.2);
      
      const currency = generateRandomCurrency();
      expect(currency.symbol).toMatch(/^[A-Z]{3}$/); // 3 uppercase letters
      expect(currency.name.endsWith('Coin')).toBe(true);
      expect(currency).not.toHaveProperty('code');

      mockRandom.mockRestore();
    });

    it('should generate valid fiat currency format', () => {
      // Mock Math.random to always return 0.8 (≥ 0.5 for fiat)
      const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.8);
      
      const currency = generateRandomCurrency();
      expect(currency).toHaveProperty('code');
      expect(currency.code).toMatch(/^[A-Z]{3}$/); // 3 uppercase letters
      expect(currency.name.endsWith('Currency')).toBe(true);

      mockRandom.mockRestore();
    });
  });
}); 