import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import CurrencyListItem from 'src/components/CurrencyListItem';
import EmptyList from 'src/components/EmptyList';
import { CurrencyInfo } from 'src/models/CurrencyInfo';
import { getSearchHint, searchCurrencies } from 'src/utils/currencySearch';

type Props = {
  data: CurrencyInfo[];
  searchTerm?: string;
  onItemPress?: (item: CurrencyInfo) => void;
};

const CurrencyList: React.FC<Props> = ({ 
  data, 
  searchTerm = '',
  onItemPress 
}) => {
  const filteredData = React.useMemo(
    () => searchCurrencies(data, searchTerm),
    [data, searchTerm]
  );

  const renderItem = useCallback(({ item }: ListRenderItemInfo<CurrencyInfo>) => (
    <CurrencyListItem item={item} onPress={onItemPress} />
  ), [onItemPress]);

  if (filteredData.length === 0) {
    const searchHint = getSearchHint(data);
    return (
      <EmptyList
        description={searchHint} 
      />
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

export default CurrencyList;