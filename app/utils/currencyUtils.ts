import { CurrencyInfo } from 'app/models/CurrencyInfo';
import { CurrencyFilterType } from 'app/store/currencyStore';

// Currency type check
export const isCryptoCurrency = (currency: CurrencyInfo): boolean => {
  return !('code' in currency);
};

// Filter helper function
export const filterCurrencies = (currencies: CurrencyInfo[], filter: CurrencyFilterType): CurrencyInfo[] => {
  switch (filter) {
    case 'all':
      return currencies;
    case 'crypto':
      return currencies.filter(isCryptoCurrency);
    case 'fiat':
      return currencies.filter(currency => !isCryptoCurrency(currency));
  }
}; 