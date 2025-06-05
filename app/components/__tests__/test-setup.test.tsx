import { render } from '@testing-library/react-native';
import React from 'react';
import { Text, View } from 'react-native';

describe('Testing environment', () => {
  it('should work with React Native components', () => {
    const { getByText } = render(
      <View>
        <Text>Test Environment Setup</Text>
      </View>
    );
    
    expect(getByText('Test Environment Setup')).toBeTruthy();
  });
}); 