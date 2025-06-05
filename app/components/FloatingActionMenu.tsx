import { MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';

type ActionItem = {
  icon: string;
  label: string;
  onPress: () => void;
  color?: string;
};

type Props = {
  actions: ActionItem[];
};

export const FloatingActionMenu: React.FC<Props> = ({ actions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    setIsOpen(false);
  };

  // Animations
  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const backdropOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  const buttonOpacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  return (
    <>
      {/* Backdrop */}
      <Animated.View 
        style={[
          styles.backdrop,
          { 
            opacity: backdropOpacity,
            pointerEvents: isOpen ? 'auto' : 'none'
          }
        ]}
      >
        <Pressable 
          style={styles.backdropPressable}
          onPress={closeMenu}
        />
      </Animated.View>

      {/* Action Items */}
      {actions.map((action, index) => {
        const translateY = animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -60 * (actions.length - index)],
        });

        return (
          <Animated.View 
            key={action.label}
            style={[
              styles.fabItem, 
              { 
                transform: [{ translateY }],
                opacity: buttonOpacity,
                pointerEvents: isOpen ? 'auto' : 'none'
              }
            ]}
          >
            <TouchableOpacity 
              style={[
                styles.fabItemButton,
                action.color ? { backgroundColor: action.color } : null
              ]} 
              onPress={() => {
                action.onPress();
                closeMenu();
              }}
            >
              <MaterialIcons name={action.icon} size={24} color="white" />
              <Text style={styles.fabItemText}>{action.label}</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      })}

      {/* Main FAB */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={toggleMenu}
        activeOpacity={0.8}
      >
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <MaterialIcons name="add" size={24} color="white" />
        </Animated.View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
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
  fabItemText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
}); 