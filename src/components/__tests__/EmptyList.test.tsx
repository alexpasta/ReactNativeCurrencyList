import { render } from '@testing-library/react-native';
import React from 'react';
import EmptyList from 'src/components/EmptyList';

jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: 'MaterialIcons',
}));

describe('EmptyList', () => {
  it('should render with default title', () => {
    const { getByText } = render(<EmptyList />);
    
    expect(getByText('No Results')).toBeTruthy();
  });

  it('should render with custom title', () => {
    const customTitle = 'Custom empty title';
    const { getByText } = render(<EmptyList title={customTitle} />);
    
    expect(getByText(customTitle)).toBeTruthy();
  });

  it('should render with description when provided', () => {
    const customDescription = 'Try searching for Bitcoin';
    const { getByText } = render(
      <EmptyList title="No Results" description={customDescription} />
    );
    
    expect(getByText('No Results')).toBeTruthy();
    expect(getByText(customDescription)).toBeTruthy();
  });

  it('should not render description when not provided', () => {
    const { queryByText, queryAllByText } = render(<EmptyList title="No Results" />);
    
    expect(queryByText('No Results')).toBeTruthy();
    const allTextElements = queryAllByText(/./);
    expect(allTextElements).toHaveLength(1);
  });

  it('should render both title and description together', () => {
    const title = 'Custom Title';
    const description = 'Custom Description';
    const { getByText } = render(
      <EmptyList title={title} description={description} />
    );
    
    expect(getByText(title)).toBeTruthy();
    expect(getByText(description)).toBeTruthy();
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