export const strings = {
  // Search
  searchPlaceholder: 'Search currencies...',
  close: '✕',
  
  // Empty List
  noResults: 'No Results',
  searchHint: (suggestion: string) => `Try "${suggestion}"`,
  
  // Currency Filter
  filterAll: 'All',
  filterCrypto: 'Crypto',
  filterFiat: 'Fiat',
  
  // FAB Actions
  clearData: 'Clear Data',
  addRandomCurrency: 'Add Random Currency',
  resetData: 'Reset Data',
} as const;

export type StringKeys = keyof typeof strings; 