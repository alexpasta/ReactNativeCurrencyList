import { strings } from 'app/constants/strings';
import { CurrencyFilterType } from 'app/store/currencyStore';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';

type Props = {
  currentFilter: CurrencyFilterType;
  onFilterChange: (filter: CurrencyFilterType) => void;
};

const CurrencyFilterComponent: React.FC<Props> = ({
  currentFilter,
  onFilterChange,
}) => {
  return (
    <View style={styles.container}>
      <Chip
        selected={currentFilter === 'all'}
        onPress={() => onFilterChange('all')}
        icon="view-list"
        mode="outlined"
        compact
        style={[
          styles.chip,
          currentFilter === 'all' && styles.chipSelected
        ]}
        textStyle={[
          styles.chipText,
          currentFilter === 'all' && styles.chipTextSelected
        ]}
      >
        {strings.filterAll}
      </Chip>
      
      <Chip
        selected={currentFilter === 'crypto'}
        onPress={() => onFilterChange('crypto')}
        icon="currency-btc"
        mode="outlined"
        compact
        style={[
          styles.chip,
          currentFilter === 'crypto' && styles.chipSelected
        ]}
        textStyle={[
          styles.chipText,
          currentFilter === 'crypto' && styles.chipTextSelected
        ]}
      >
        {strings.filterCrypto}
      </Chip>
      
      <Chip
        selected={currentFilter === 'fiat'}
        onPress={() => onFilterChange('fiat')}
        icon="cash"
        mode="outlined"
        compact
        style={[
          styles.chip,
          currentFilter === 'fiat' && styles.chipSelected
        ]}
        textStyle={[
          styles.chipText,
          currentFilter === 'fiat' && styles.chipTextSelected
        ]}
      >
        {strings.filterFiat}
      </Chip>
    </View>
  );
};

const CurrencyFilter = React.memo(CurrencyFilterComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  chip: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
  },
  chipSelected: {
    backgroundColor: '#BBBBBB',
  },
  chipText: {
    color: '#666',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
});

export default CurrencyFilter;