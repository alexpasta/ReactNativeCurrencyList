import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Animated,
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { CurrencyList } from '../components/CurrencyList';
import type { CurrencyFilter } from '../store/currencyStore';
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
    showCryptoList,
    showFiatList,
    showAllCurrencies,
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

  const getFilterButtonStyle = (buttonFilter: CurrencyFilter) => {
    return [
      styles.button,
      filter === buttonFilter && styles.buttonActive
    ];
  };

  const getFilterTextStyle = (buttonFilter: CurrencyFilter) => {
    return [
      styles.buttonText,
      filter === buttonFilter && styles.buttonTextActive
    ];
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={getFilterButtonStyle('crypto')}
            onPress={showCryptoList}
          >
            <MaterialIcons 
              name="currency-bitcoin" 
              size={20} 
              color={filter === 'crypto' ? '#007AFF' : 'white'} 
            />
            <Text style={getFilterTextStyle('crypto')}>Cryptocurrencies</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={getFilterButtonStyle('fiat')}
            onPress={showFiatList}
          >
            <MaterialIcons 
              name="attach-money" 
              size={20} 
              color={filter === 'fiat' ? '#007AFF' : 'white'} 
            />
            <Text style={getFilterTextStyle('fiat')}>Fiat Currencies</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={getFilterButtonStyle('all')}
            onPress={showAllCurrencies}
          >
            <MaterialIcons 
              name="list" 
              size={20} 
              color={filter === 'all' ? '#007AFF' : 'white'} 
            />
            <Text style={getFilterTextStyle('all')}>All Currencies</Text>
          </TouchableOpacity>
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
  buttonContainer: {
    padding: 16,
    gap: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonActive: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  buttonTextActive: {
    color: '#007AFF',
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