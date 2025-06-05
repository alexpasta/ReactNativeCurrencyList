import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { CurrencyInfo } from '../models/CurrencyInfo';
import { filterCurrencyList } from '../utils/currencyFilter';
import { CurrencyListItem } from './CurrencyListItem';
import { EmptyList } from './EmptyList';

type Props = {
  data: CurrencyInfo[];
  searchTerm?: string;
  onItemPress?: (item: CurrencyInfo) => void;
};

export const CurrencyList: React.FC<Props> = ({ 
  data, 
  searchTerm = '',
  onItemPress 
}) => {
  const filteredData = React.useMemo(
    () => filterCurrencyList(data, searchTerm),
    [data, searchTerm]
  );

  const renderItem = ({ item }: ListRenderItemInfo<CurrencyInfo>) => (
    <CurrencyListItem 
      item={item} 
      onPress={() => onItemPress?.(item)}
    />
  );

  if (filteredData.length === 0) {
    return <EmptyList />;
  }

  return (
    <FlatList
      data={filteredData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.list}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={true}
      removeClippedSubviews={true}
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
}); 