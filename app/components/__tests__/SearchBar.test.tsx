import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  const mockOnChangeText = jest.fn();
  const mockOnClear = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with default placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        onClear={mockOnClear}
      />
    );

    expect(getByPlaceholderText('Search currencies...')).toBeTruthy();
  });

  it('should render with custom placeholder', () => {
    const customPlaceholder = 'Custom placeholder';
    const { getByPlaceholderText } = render(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        onClear={mockOnClear}
        placeholder={customPlaceholder}
      />
    );

    expect(getByPlaceholderText(customPlaceholder)).toBeTruthy();
  });

  it('should call onChangeText when text is entered', () => {
    const { getByPlaceholderText } = render(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        onClear={mockOnClear}
      />
    );

    const input = getByPlaceholderText('Search currencies...');
    fireEvent.changeText(input, 'BTC');

    expect(mockOnChangeText).toHaveBeenCalledWith('BTC');
  });

  it('should show clear button when there is text', () => {
    const { getByText } = render(
      <SearchBar
        value="BTC"
        onChangeText={mockOnChangeText}
        onClear={mockOnClear}
      />
    );

    expect(getByText('✕')).toBeTruthy();
  });

  it('should not show clear button when text is empty', () => {
    const { queryByText } = render(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        onClear={mockOnClear}
      />
    );

    expect(queryByText('✕')).toBeNull();
  });

  it('should call onClear when clear button is pressed', () => {
    const { getByText } = render(
      <SearchBar
        value="BTC"
        onChangeText={mockOnChangeText}
        onClear={mockOnClear}
      />
    );

    const clearButton = getByText('✕');
    fireEvent.press(clearButton);

    expect(mockOnClear).toHaveBeenCalled();
  });
}); 