import { strings } from 'app/constants/strings';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
};

const SearchBar: React.FC<Props> = ({
  value,
  onChangeText,
  onClear,
  placeholder = strings.searchPlaceholder,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>{strings.close}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    fontSize: 16,
  },
  clearButton: {
    position: 'absolute',
    right: 24,
    padding: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#999',
  },
}); 

export default SearchBar;
