import { CurrencyInfo } from "../models/CurrencyInfo";

export function searchCurrencies(currencies: CurrencyInfo[], searchTerm: string): CurrencyInfo[] {
  if (!searchTerm) return currencies;

  const term = searchTerm.toLowerCase();
  return currencies.filter((currency) => {
    if (currency.name.toLowerCase().includes(term)) return true;
    if (currency.symbol.toLowerCase().includes(term)) return true;
    if (currency.code?.toLowerCase().includes(term)) return true;
    return false;
  });
} 