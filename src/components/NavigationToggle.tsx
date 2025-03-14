import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationMode } from '../types/navigation';

interface NavigationToggleProps {
  mode: NavigationMode;
  onModeChange: (mode: NavigationMode) => void;
  isIndoorAvailable: boolean;
}

export const NavigationToggle: React.FC<NavigationToggleProps> = ({
  mode,
  onModeChange,
  isIndoorAvailable
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          mode === NavigationMode.OUTDOOR && styles.activeButton,
          styles.leftButton
        ]}
        onPress={() => onModeChange(NavigationMode.OUTDOOR)}
      >
        <Text style={[
          styles.buttonText,
          mode === NavigationMode.OUTDOOR && styles.activeText
        ]}>
          Outdoor
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.button,
          mode === NavigationMode.INDOOR && styles.activeButton,
          styles.rightButton,
          !isIndoorAvailable && styles.disabledButton
        ]}
        onPress={() => isIndoorAvailable && onModeChange(NavigationMode.INDOOR)}
        disabled={!isIndoorAvailable}
      >
        <Text style={[
          styles.buttonText,
          mode === NavigationMode.INDOOR && styles.activeText,
          !isIndoorAvailable && styles.disabledText
        ]}>
          Indoor
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeButton: {
    backgroundColor: '#2196F3',
  },
  leftButton: {
    marginRight: 2,
  },
  rightButton: {
    marginLeft: 2,
  },
  buttonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  activeText: {
    color: '#fff',
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#999',
  },
});
