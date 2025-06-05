import { CurrencyInfo } from "../models/CurrencyInfo";

export function filterCurrencyList(data: CurrencyInfo[], searchTerm: string): CurrencyInfo[] {
    if (!searchTerm) return data;
  
    const term = searchTerm.toLowerCase();
    return data.filter((currency) => {
      if (currency.name.toLowerCase().startsWith(term)) return true;
      if (currency.name.toLowerCase().includes(` ${term}`)) return true;
      if (currency.symbol.toLowerCase().startsWith(term)) return true;
      return false;
    });
  }