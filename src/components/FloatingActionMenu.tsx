import React, { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ActionItem = {
  label: string;
  onPress: () => void;
  color?: string;
};

type Props = {
  actions: ActionItem[];
};

const FloatingActionMenuComponent: React.FC<Props> = ({ actions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

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
      tension: 80,
      friction: 8,
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

  // Calculate safe bottom position
  const fabBottomPosition = insets.bottom + 16;
  const fabItemBottomPosition = insets.bottom + 24;

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
          testID="fab-backdrop"
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
                bottom: fabItemBottomPosition,
                transform: [{ translateY }],
                opacity: buttonOpacity,
                pointerEvents: isOpen ? 'auto' : 'none'
              }
            ]}
            testID="fab-item-container"
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
              testID="fab-item"
              accessible={isOpen}
              aria-hidden={!isOpen}
            >
              <Text style={styles.fabItemText}>{action.label}</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      })}

      {/* Main FAB */}
      <TouchableOpacity 
        style={[styles.fab, { bottom: fabBottomPosition }]} 
        onPress={toggleMenu}
        activeOpacity={0.8}
        testID="fab-main"
      >
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <Text style={styles.fabText}>+</Text>
        </Animated.View>
      </TouchableOpacity>
    </>
  );
};

const FloatingActionMenu = React.memo(FloatingActionMenuComponent);

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
  fabText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  fabItem: {
    position: 'absolute',
    right: 24,
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
    fontSize: 14,
    fontWeight: '600',
  },
});

export default FloatingActionMenu;
