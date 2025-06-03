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

  const renderItem = ({ item }: ListRenderItemInfo<CurrencyInfo>) => (
    <Pressable 
      style={({ pressed }) => [
        styles.item,
        pressed && styles.itemPressed
      ]}
    >
      <View style={styles.symbolContainer}>
        <Text style={styles.symbol}>{item.symbol}</Text>
        {item.code && <Text style={styles.code}>{item.code}</Text>}
      </View>
      <Text style={styles.name}>{item.name}</Text>
    </Pressable>
  );

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
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    minHeight: 60,
  },
  itemPressed: {
    backgroundColor: '#F5F5F5',
  },
  symbolContainer: {
    width: 60,
    marginRight: 12,
  },
  symbol: {
    fontSize: 16,
    fontWeight: '600',
  },
  code: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  name: {
    fontSize: 16,
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