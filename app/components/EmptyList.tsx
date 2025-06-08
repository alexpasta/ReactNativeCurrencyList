import { MaterialIcons } from '@expo/vector-icons';
import { strings } from 'app/constants/strings';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  title?: string;
  description?: string;
};

const EmptyList: React.FC<Props> = ({ 
  title = strings.noResults,
  description
}) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.3 }} />

      <View style={styles.iconContainer}>
        <MaterialIcons name="search-off" size={48} color="#ccc" />
      </View>
      <Text style={styles.text}>{title}</Text>
      {description && <Text style={styles.text}>{description}</Text>}
      
      <View style={{ flex: 0.7 }} />
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
