import { fireEvent, render } from '@testing-library/react-native';
import { CurrencyInfo } from 'app/models/CurrencyInfo';
import React from 'react';
import { CurrencyList } from '../CurrencyList';

jest.mock('../EmptyList', () => {
  const { View } = jest.requireActual('react-native');
  return {
    EmptyList: () => <View testID="empty-list" />
  };
});

jest.mock('../CurrencyListItem', () => {
  const { View, Text, Pressable } = jest.requireActual('react-native');
  return {
    CurrencyListItem: ({ item, onPress }: { item: CurrencyInfo; onPress?: () => void }) => (
      <Pressable testID="currency-item" onPress={onPress}>
        <View>
          <Text>{item.name}</Text>
        </View>
      </Pressable>
    )
  };
});

jest.mock('app/utils/currencySearch', () => ({
  searchCurrencies: (currencies: CurrencyInfo[], searchTerm: string) => 
    currencies.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
}));

describe('CurrencyList', () => {
  const mockData: CurrencyInfo[] = [
    {
      id: '1',
      name: 'Bitcoin',
      symbol: 'BTC'
    },
    {
      id: '2',
      name: 'US Dollar',
      symbol: '$',
      code: 'USD'
    }
  ];

  const mockOnItemPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render list of currencies', () => {
    const { getAllByTestId } = render(
      <CurrencyList 
        data={mockData}
        onItemPress={mockOnItemPress}
      />
    );

    const items = getAllByTestId('currency-item');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Bitcoin');
    expect(items[1]).toHaveTextContent('US Dollar');
  });

  it('should render EmptyList when data is empty', () => {
    const { getByTestId } = render(
      <CurrencyList 
        data={[]}
        onItemPress={mockOnItemPress}
      />
    );

    expect(getByTestId('empty-list')).toBeTruthy();
  });

  it('should call onItemPress when currency item is pressed', () => {
    const { getAllByTestId } = render(
      <CurrencyList 
        data={mockData}
        onItemPress={mockOnItemPress}
      />
    );

    const items = getAllByTestId('currency-item');
    fireEvent.press(items[0]);

    expect(mockOnItemPress).toHaveBeenCalledWith(mockData[0]);
  });

  it('should filter currencies based on search term', () => {
    const { getAllByTestId } = render(
      <CurrencyList 
        data={mockData}
        searchTerm="bitcoin"
        onItemPress={mockOnItemPress}
      />
    );

    const items = getAllByTestId('currency-item');
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent('Bitcoin');
  });

  it('should show EmptyList when search has no results', () => {
    const { getByTestId } = render(
      <CurrencyList 
        data={mockData}
        searchTerm="xyz"
        onItemPress={mockOnItemPress}
      />
    );

    expect(getByTestId('empty-list')).toBeTruthy();
  });
}); 