// src/components/DraggableThemeSwitchButton.js
import React, { useRef } from 'react';
import { View, Switch, StyleSheet, Animated, PanResponder } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useAppTheme } from '../hook/use-app-theme';

const DraggableThemeSwitchButton = () => {
  const { isDarkTheme, toggleTheme } = useAppTheme();
  const { colors } = useTheme();
  const pan = useRef(new Animated.ValueXY()).current;
  const lastPosition = useRef({ x: 0, y: 0 }).current;

  // PanResponder for handling drag gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, gestureState) => {
      lastPosition.x += gestureState.dx;
      lastPosition.y += gestureState.dy;
      pan.setOffset({ x: lastPosition.x, y: lastPosition.y });
      pan.setValue({ x: 0, y: 0 });
    },
  });

  const onTogglePress = () => {
    toggleTheme();
  };

  return (
    <Animated.View
      style={[
        styles.buttonContainer,
        { transform: pan.getTranslateTransform() },
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.switchContainer}>
        <Switch
          value={isDarkTheme}
          onValueChange={onTogglePress}
          trackColor={{
            false: '#D3D3D3',         // Light gray track when off
            true: isDarkTheme ? '#D3D3D3' : '#D3D3D3', // Light gray track when on
          }}
          thumbColor={isDarkTheme ? '#FFFFFF' : '#000000'} // White thumb on dark mode, black on light mode
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1000,
  },
  switchContainer: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#FF8A75', // Static peach background color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#FF6B52', // Slightly darker peach border
  },
});

export default DraggableThemeSwitchButton;
