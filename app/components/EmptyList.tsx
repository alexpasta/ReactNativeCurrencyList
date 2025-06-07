import { MaterialIcons } from '@expo/vector-icons';
import { strings } from 'app/constants/strings';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  message?: string;
};

const EmptyList: React.FC<Props> = ({ 
  message = strings.noResults
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="search-off" size={48} color="#ccc" />
      </View>
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
  iconContainer: {
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
});

export default EmptyList;
