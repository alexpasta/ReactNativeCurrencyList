import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import {
  Animated,
  BackHandler,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CurrencyList } from '../components/CurrencyList';
import { useCurrencyStore } from '../store/currencyStore';

export const DemoScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isFabOpen, setIsFabOpen] = React.useState(false);
  const fabAnimation = React.useRef(new Animated.Value(0)).current;

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

  const toggleFab = () => {
    const toValue = isFabOpen ? 0 : 1;
    Animated.spring(fabAnimation, {
      toValue,
      useNativeDriver: true,
    }).start();
    setIsFabOpen(!isFabOpen);
  };

  const closeFab = () => {
    Animated.spring(fabAnimation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    setIsFabOpen(false);
  };

  // FAB animations
  const rotation = fabAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const firstButtonTranslateY = fabAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -160],
  });

  const secondButtonTranslateY = fabAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -110],
  });

  const thirdButtonTranslateY = fabAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60],
  });

  const buttonOpacity = fabAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  const backdropOpacity = fabAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  useEffect(() => {
    const onBackPress = () => {
      if (searchTerm && searchTerm.length > 0) {
        handleClearSearch();
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      subscription.remove();
    };
  }, [searchTerm]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView 
        style={styles.content} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Search currencies..."
            placeholderTextColor="#999"
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <Chip
            selected={filter === 'all'}
            onPress={() => setFilter('all')}
            icon="view-list"
            mode="outlined"
            compact
            style={[
              styles.chip,
              filter === 'all' && styles.chipSelected
            ]}
            textStyle={[
              styles.chipText,
              filter === 'all' && styles.chipTextSelected
            ]}
          >
            All
          </Chip>
          
          <Chip
            selected={filter === 'crypto'}
            onPress={() => setFilter('crypto')}
            icon="currency-btc"
            mode="outlined"
            compact
            style={[
              styles.chip,
              filter === 'crypto' && styles.chipSelected
            ]}
            textStyle={[
              styles.chipText,
              filter === 'crypto' && styles.chipTextSelected
            ]}
          >
            Crypto
          </Chip>
          
          <Chip
            selected={filter === 'fiat'}
            onPress={() => setFilter('fiat')}
            icon="cash"
            mode="outlined"
            compact
            style={[
              styles.chip,
              filter === 'fiat' && styles.chipSelected
            ]}
            textStyle={[
              styles.chipText,
              filter === 'fiat' && styles.chipTextSelected
            ]}
          >
            Fiat
          </Chip>
        </View>

        {/* Currency List */}
        <View style={styles.listContainer}>
          <CurrencyList
            data={currencies}
            searchTerm={searchTerm}
          />
        </View>

        {/* Backdrop */}
        <Animated.View 
          style={[
            styles.backdrop,
            { 
              opacity: backdropOpacity,
              pointerEvents: isFabOpen ? 'auto' : 'none'
            }
          ]}
        >
          <Pressable 
            style={styles.backdropPressable}
            onPress={closeFab}
          />
        </Animated.View>

        {/* FAB Menu Items */}
        <Animated.View 
          style={[
            styles.fabItem, 
            { 
              transform: [{ translateY: firstButtonTranslateY }],
              opacity: buttonOpacity,
              pointerEvents: isFabOpen ? 'auto' : 'none'
            }
          ]}
        >
          <TouchableOpacity 
            style={[styles.fabItemButton, styles.fabSecondary]} 
            onPress={() => { clearCurrencies(); closeFab(); }}
          >
            <MaterialIcons name="delete" size={24} color="white" />
            <Text style={styles.fabItemText}>Clear Data</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View 
          style={[
            styles.fabItem, 
            { 
              transform: [{ translateY: secondButtonTranslateY }],
              opacity: buttonOpacity,
              pointerEvents: isFabOpen ? 'auto' : 'none'
            }
          ]}
        >
          <TouchableOpacity 
            style={[styles.fabItemButton, styles.fabSecondary]} 
            onPress={() => { insertRandomCurrency(); closeFab(); }}
          >
            <MaterialIcons name="add" size={24} color="white" />
            <Text style={styles.fabItemText}>Add Random Currency</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View 
          style={[
            styles.fabItem, 
            { 
              transform: [{ translateY: thirdButtonTranslateY }],
              opacity: buttonOpacity,
              pointerEvents: isFabOpen ? 'auto' : 'none'
            }
          ]}
        >
          <TouchableOpacity 
            style={[styles.fabItemButton, styles.fabSecondary]} 
            onPress={() => { resetData(); closeFab(); }}
          >
            <MaterialIcons name="refresh" size={24} color="white" />
            <Text style={styles.fabItemText}>Reset Data</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Main FAB */}
        <TouchableOpacity 
          style={styles.fab} 
          onPress={toggleFab}
          activeOpacity={0.8}
        >
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <MaterialIcons name="add" size={24} color="white" />
          </Animated.View>
        </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  clearButton: {
    position: 'absolute',
    right: 24,
    padding: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#999',
  },
  filterContainer: {
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
  listContainer: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    zIndex: 1,
  },
  backdropPressable: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    zIndex: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  fabItem: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    zIndex: 2,
  },
  fabItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#FF3B30',
  },
  fabSecondary: {
    backgroundColor: '#FF3B30',
  },
  fabItemText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
}); 