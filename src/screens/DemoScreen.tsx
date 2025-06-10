import React, { useEffect } from 'react';
import { BackHandler, Keyboard, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CurrencyFilter from 'src/components/CurrencyFilter';
import CurrencyList from 'src/components/CurrencyList';
import FloatingActionMenu from 'src/components/FloatingActionMenu';
import SearchBar from 'src/components/SearchBar';
import { strings } from 'src/constants/strings';
import { useCurrencyStore } from 'src/store/currencyStore';
import { useDebounce } from 'src/utils/useDebounce';

const DemoScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  // Debounce search term to improve performance
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  
  const {
    currencies,
    filter,
    clearCurrencies,
    insertRandomCurrency,
    resetData,
    setFilter,
  } = useCurrencyStore();

  const handleClearSearch = () => {
    setSearchTerm('');
    Keyboard.dismiss();
  };

  useEffect(() => {
    const onBackPress = () => {
      if (searchTerm && searchTerm.length > 0) {
        handleClearSearch();
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, [searchTerm]);

  const fabActions = React.useMemo(() => [
    {
      label: strings.clearData,
      onPress: clearCurrencies,
      color: '#007AFF',
    },
    {
      label: strings.addRandomCurrency,
      onPress: insertRandomCurrency,
      color: '#007AFF',
    },
    {
      label: strings.resetData,
      onPress: resetData,
      color: '#007AFF',
    },
  ], [clearCurrencies, insertRandomCurrency, resetData]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView 
        style={styles.content} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <SearchBar
          value={searchTerm}
          onChangeText={setSearchTerm}
          onClear={handleClearSearch}
        />

        <CurrencyFilter
          currentFilter={filter}
          onFilterChange={setFilter}
        />

        <CurrencyList
          data={currencies}
          searchTerm={debouncedSearchTerm}
        />

        <FloatingActionMenu actions={fabActions} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
}); 

export default DemoScreen;
