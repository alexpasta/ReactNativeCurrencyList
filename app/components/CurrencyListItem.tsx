import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CurrencyInfo } from '../models/CurrencyInfo';

type Props = {
  item: CurrencyInfo;
  onPress?: () => void;
};

export const CurrencyListItem: React.FC<Props> = ({ item, onPress }) => {
  const initial = item.name.charAt(0).toUpperCase();

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={onPress}
    >
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>{initial}</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.rightContainer}>
          <View style={styles.symbolContainer}>
            <Text style={styles.symbol}>{item.symbol}</Text>
            {item.code && <Text style={styles.code}>{item.code}</Text>}
          </View>
          <MaterialIcons name="chevron-right" size={20} color="#999" />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressed: {
    backgroundColor: '#F5F5F5',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6b7280',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  symbolContainer: {
    flexDirection: 'row',
  },
  symbol: {
    fontSize: 14,
    color: '#6b7280',
    marginRight: 4,
  },
  code: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
}); 