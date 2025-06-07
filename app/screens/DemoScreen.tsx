import CurrencyFilter from 'app/components/CurrencyFilter';
import CurrencyList from 'app/components/CurrencyList';
import FloatingActionMenu from 'app/components/FloatingActionMenu';
import SearchBar from 'app/components/SearchBar';
import { strings } from 'app/constants/strings';
import { useCurrencyStore } from 'app/store/currencyStore';
import React, { useEffect } from 'react';
import { BackHandler, Keyboard, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DemoScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
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
          searchTerm={searchTerm}
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
