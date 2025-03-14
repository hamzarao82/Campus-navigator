import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationMap } from '../components/NavigationMap';
import { POI } from '../types/navigation';

export const NavigationScreen: React.FC = () => {
  const [pois, setPOIs] = useState<POI[]>([]);

  useEffect(() => {
    // Load POIs from backend
    // Implementation will be added in next iteration
    loadPOIs();
  }, []);

  const loadPOIs = async () => {
    // Fetch POIs from your backend
    // This is a placeholder implementation
    const dummyPOIs: POI[] = [
      {
        id: '1',
        name: 'Main Entrance',
        latitude: 0,
        longitude: 0,
        category: 'exit',
      },
      // Add more POIs
    ];
    setPOIs(dummyPOIs);
  };

  const handlePOISelect = (poi: POI) => {
    // Handle POI selection
    console.log('Selected POI:', poi);
  };

  return (
    <View style={styles.container}>
      <NavigationMap
        pois={pois}
        onPOISelect={handlePOISelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
