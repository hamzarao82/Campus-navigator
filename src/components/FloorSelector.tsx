import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface FloorSelectorProps {
  floors: number[];
  currentFloor: number;
  onFloorChange: (floor: number) => void;
}

export const FloorSelector: React.FC<FloorSelectorProps> = ({
  floors,
  currentFloor,
  onFloorChange
}) => {
  return (
    <View style={styles.container}>
      {floors.map((floor) => (
        <TouchableOpacity
          key={floor}
          style={[
            styles.floorButton,
            currentFloor === floor && styles.activeFloor
          ]}
          onPress={() => onFloorChange(floor)}
        >
          <Text style={[
            styles.floorText,
            currentFloor === floor && styles.activeFloorText
          ]}>
            {floor === 0 ? 'G' : floor}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
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
  floorButton: {
    padding: 8,
    minWidth: 40,
    alignItems: 'center',
    marginVertical: 2,
    borderRadius: 8,
  },
  activeFloor: {
    backgroundColor: '#2196F3',
  },
  floorText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  activeFloorText: {
    color: '#fff',
  },
});
