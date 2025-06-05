import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  message?: string;
};

export const EmptyList: React.FC<Props> = ({ 
  message = 'No currencies found' 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
}); 