import { render } from '@testing-library/react-native';
import React from 'react';
import { EmptyList } from '../EmptyList';

jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: 'MaterialIcons',
}));

describe('EmptyList', () => {
  it('should render with default message', () => {
    const { getByText, getByTestId } = render(<EmptyList />);
    
    expect(getByText('No Results')).toBeTruthy();
  });

  it('should render with custom message', () => {
    const customMessage = 'Custom empty message';
    const { getByText } = render(<EmptyList message={customMessage} />);
    
    expect(getByText(customMessage)).toBeTruthy();
  });

  it('should render search-off icon', () => {
    const { UNSAFE_getByProps } = render(<EmptyList />);
    
    const icon = UNSAFE_getByProps({ 
      name: 'search-off',
      size: 48,
      color: '#ccc'
    });
    
    expect(icon).toBeTruthy();
  });
}); 