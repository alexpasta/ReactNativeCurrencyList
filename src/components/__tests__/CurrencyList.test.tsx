import { fireEvent, render } from '@testing-library/react-native';
import { CurrencyInfo } from 'src/models/CurrencyInfo';
import React from 'react';
import CurrencyList from '../CurrencyList';

jest.mock('../EmptyList', () => {
  const { View, Text } = jest.requireActual('react-native');
  return ({ title, description }: { title?: string; description?: string }) => (
    <View testID="empty-list">
      {title && <Text testID="empty-title">{title}</Text>}
      {description && <Text testID="empty-description">{description}</Text>}
    </View>
  );
});

jest.mock('../CurrencyListItem', () => {
  const { View, Text, Pressable } = jest.requireActual('react-native');
  return ({ item, onPress }: { item: CurrencyInfo; onPress?: (item: CurrencyInfo) => void }) => (
    <Pressable testID="currency-item" onPress={() => onPress?.(item)}>
      <View>
        <Text>{item.name}</Text>
      </View>
    </Pressable>
  );
});

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