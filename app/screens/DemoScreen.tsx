import React, { useEffect } from 'react';
import { BackHandler, Keyboard, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CurrencyFilter } from '../components/CurrencyFilter';
import { CurrencyList } from '../components/CurrencyList';
import { FloatingActionMenu } from '../components/FloatingActionMenu';
import { SearchBar } from '../components/SearchBar';
import { useCurrencyStore } from '../store/currencyStore';

export const DemoScreen: React.FC = () => {
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

  const fabActions = [
    {
      icon: 'delete',
      label: 'Clear Data',
      onPress: clearCurrencies,
      color: '#FF3B30',
    },
    {
      icon: 'add',
      label: 'Add Random Currency',
      onPress: insertRandomCurrency,
      color: '#FF3B30',
    },
    {
      icon: 'refresh',
      label: 'Reset Data',
      onPress: resetData,
      color: '#FF3B30',
    },
  ];

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