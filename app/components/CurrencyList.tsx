import { CurrencyListItem } from 'app/components/CurrencyListItem';
import { EmptyList } from 'app/components/EmptyList';
import { CurrencyInfo } from 'app/models/CurrencyInfo';
import { searchCurrencies } from 'app/utils/currencySearch';
import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';

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
    () => searchCurrencies(data, searchTerm),
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
      testID="currency-list"
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