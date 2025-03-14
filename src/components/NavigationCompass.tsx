import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '../hooks/useNavigation';

export default function NavigationCompass({ destination, isIndoor, currentFloor }) {
  const { distance, bearing, error } = useNavigation(destination);

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.compass, { transform: [{ rotate: `${bearing}deg` }] }]}>
        <View style={styles.arrow} />
      </View>
      {distance && (
        <Text style={styles.distance}>
          {(distance * 1000).toFixed(0)}m away
        </Text>
      )}
      {isIndoor && destination.isIndoor && (
        <Text style={styles.floorInfo}>
          {currentFloor === destination.floor 
            ? 'Same floor'
            : `${Math.abs(currentFloor - destination.floor)} floor${Math.abs(currentFloor - destination.floor) > 1 ? 's' : ''} ${currentFloor < destination.floor ? 'up' : 'down'}`
          }
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  compass: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#000',
  },
  distance: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  floorInfo: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  error: {
    color: 'red',
    padding: 10,
  },
});
