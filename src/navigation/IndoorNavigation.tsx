import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IndoorAtlasModule } from '../modules/IndoorAtlasModule';
import { NavigationMap } from '../components/NavigationMap';
import { NavigationCompass } from '../components/NavigationCompass';
import { useIndoorNavigation } from '../hooks/useIndoorNavigation';
import { POI } from '../types/navigation';

export const IndoorNavigation = () => {
  const { 
    currentLocation,
    currentFloor,
    nearbyPOIs,
    startNavigation,
    stopNavigation
  } = useIndoorNavigation();

  useEffect(() => {
    IndoorAtlasModule.initialize();
    return () => IndoorAtlasModule.cleanup();
  }, []);

  const handlePOISelect = (poi: POI) => {
    startNavigation(poi);
  };

  return (
    <View style={styles.container}>
      <NavigationMap
        currentLocation={currentLocation}
        pois={nearbyPOIs}
        onPOISelect={handlePOISelect}
        floor={currentFloor}
      />
      <NavigationCompass direction={currentLocation?.heading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
