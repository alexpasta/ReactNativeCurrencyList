import { strings } from "src/constants/strings";
import { CurrencyInfo } from "src/models/CurrencyInfo";

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

export function getSearchHint(currencies: CurrencyInfo[]): string {
  const firstItem = currencies[0];
  const firstItemDescription = firstItem?.code || firstItem?.symbol || '';
  return firstItemDescription ? strings.searchHint(firstItemDescription) : '';
}