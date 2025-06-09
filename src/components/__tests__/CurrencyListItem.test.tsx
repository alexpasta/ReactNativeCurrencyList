import { fireEvent, render } from '@testing-library/react-native';
import { CurrencyInfo } from 'src/models/CurrencyInfo';
import React from 'react';
import CurrencyListItem from '../CurrencyListItem';

jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: 'MaterialIcons'
}));

describe('CurrencyListItem', () => {
  const mockCryptoItem: CurrencyInfo = {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC'
  };

  const mockFiatItem: CurrencyInfo = {
    id: '2',
    name: 'US Dollar',
    symbol: '$',
    code: 'USD'
  };

  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render crypto currency correctly', () => {
    const { getByText } = render(
      <CurrencyListItem item={mockCryptoItem} onPress={mockOnPress} />
    );

    expect(getByText('Bitcoin')).toBeTruthy();
    expect(getByText('BTC')).toBeTruthy();
    expect(getByText('B')).toBeTruthy(); // Initial letter in circle
  });

  it('should render fiat currency correctly', () => {
    const { getByText } = render(
      <CurrencyListItem item={mockFiatItem} onPress={mockOnPress} />
    );

    expect(getByText('US Dollar')).toBeTruthy();
    expect(getByText('$')).toBeTruthy();
    expect(getByText('USD')).toBeTruthy();
    expect(getByText('U')).toBeTruthy(); // Initial letter in circle
  });

  it('should call onPress when pressed', () => {
    const { getByTestId } = render(
      <CurrencyListItem item={mockCryptoItem} onPress={mockOnPress} />
    );

    const pressable = getByTestId('currency-list-item');
    fireEvent.press(pressable);

    expect(mockOnPress).toHaveBeenCalled();
  });

  it('should not crash when onPress is not provided', () => {
    const { getByTestId } = render(
      <CurrencyListItem item={mockCryptoItem} />
    );

    const pressable = getByTestId('currency-list-item');
    expect(() => fireEvent.press(pressable)).not.toThrow();
  });
}); 