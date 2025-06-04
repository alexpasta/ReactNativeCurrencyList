import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CurrencyInfo } from '../models/CurrencyInfo';

type Props = {
  data: CurrencyInfo[];
  searchTerm?: string;
};

export const CurrencyList: React.FC<Props> = ({ data, searchTerm = '' }) => {
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data;
    
    const term = searchTerm.toLowerCase();
    return data.filter((currency) => {
      // 1. Name starts with search term
      if (currency.name.toLowerCase().startsWith(term)) return true;
      
      // 2. Name contains search term with space prefix
      if (currency.name.toLowerCase().includes(` ${term}`)) return true;
      
      // 3. Symbol starts with search term
      if (currency.symbol.toLowerCase().startsWith(term)) return true;
      
      return false;
    });
  }, [data, searchTerm]);

  const renderItem = ({ item }: ListRenderItemInfo<CurrencyInfo>) => {
    const initial = item.name.charAt(0).toUpperCase();
  
    return (
      <Pressable 
        style={({ pressed }) => [
          styles.itemContainer,
          pressed && styles.itemPressed
        ]}
      >
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>{initial}</Text>
        </View>
        
        <View style={styles.itemContent}>
          <Text style={styles.itemName}>{item.name}</Text>
          <View style={styles.itemRightContainer}>
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

  if (filteredData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No currencies found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.list}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={true}
      scrollEventThrottle={16}
      overScrollMode="always"
      bounces={true}
      alwaysBounceVertical={true}
      onEndReachedThreshold={0.5}
      removeClippedSubviews={true}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      keyboardShouldPersistTaps="handled"
      scrollIndicatorInsets={{ right: 1 }}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#f5f5fa',
  },
  listContent: {
    paddingLeft: 16,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPressed: {
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
  itemContent: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  itemRightContainer: {
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
}); 