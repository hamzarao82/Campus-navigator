import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { POI, POICategory } from '../types/navigation';

interface POIMarkerProps {
  poi: POI;
  onPress?: (poi: POI) => void;
}

const getCategoryIcon = (category: POICategory) => {
  // Map categories to icon names
  const icons = {
    [POICategory.CLASSROOM]: '🎓',
    [POICategory.OFFICE]: '💼',
    [POICategory.LABORATORY]: '🔬',
    [POICategory.RESTROOM]: '🚻',
    [POICategory.ELEVATOR]: '⬆️',
    [POICategory.STAIRS]: '🪜',
    [POICategory.EXIT]: '🚪',
    [POICategory.OTHER]: '📍'
  };
  return icons[category] || '📍';
};

export const POIMarker: React.FC<POIMarkerProps> = ({ poi, onPress }) => {
  return (
    <Marker
      coordinate={{
        latitude: poi.latitude,
        longitude: poi.longitude
      }}
      onPress={() => onPress?.(poi)}
    >
      <View style={styles.markerContainer}>
        <Text style={styles.icon}>{getCategoryIcon(poi.category)}</Text>
        <Text style={styles.label}>{poi.name}</Text>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  label: {
    fontSize: 12,
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 4,
  },
});
