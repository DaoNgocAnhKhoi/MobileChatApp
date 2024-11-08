// src/components/DraggableThemeSwitchButton.js
import React, { useRef } from 'react';
import { View, Switch, StyleSheet, Animated, PanResponder } from 'react-native';
import { useTheme } from 'react-native-paper'; // Import useTheme to access theme colors
import { useAppTheme } from '../hook/use-app-theme';

const DraggableThemeSwitchButton = () => {
  const { isDarkTheme, toggleTheme } = useAppTheme();
  const { colors } = useTheme(); // Access colors from theme
  const pan = useRef(new Animated.ValueXY()).current;
  const lastPosition = useRef({ x: 0, y: 0 }).current;

  // PanResponder for handling drag gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x, dy: pan.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (e, gestureState) => {
      lastPosition.x += gestureState.dx;
      lastPosition.y += gestureState.dy;
      pan.setOffset({ x: lastPosition.x, y: lastPosition.y });
      pan.setValue({ x: 0, y: 0 });
    },
  });

  const onTogglePress = () => {
    toggleTheme(); // Function to toggle theme
  };

  return (
    <Animated.View
      style={[styles.buttonContainer, { transform: pan.getTranslateTransform() }]}
      {...panResponder.panHandlers}
    >
      <View style={[styles.switchContainer, { backgroundColor: colors.primary }]}>
        <Switch
          value={isDarkTheme}
          onValueChange={onTogglePress}
          trackColor={{ false: colors.background, true: colors.primary }}
          thumbColor={isDarkTheme ? colors.onPrimary : colors.onSurface}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    top: 40, // Positioned in the top-left corner
    left: 20,
    zIndex: 1000,
  },
  switchContainer: {
    padding: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default DraggableThemeSwitchButton;
