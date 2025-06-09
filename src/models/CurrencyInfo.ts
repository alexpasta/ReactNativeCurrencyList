export type CurrencyInfo = {
  id: string;
  name: string;
  symbol: string;
  code?: string; // Optional, for fiat currencies only
}; 