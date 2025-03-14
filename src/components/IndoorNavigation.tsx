import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useIndoorNavigation } from '../hooks/useIndoorNavigation';

export const IndoorNavigation: React.FC = () => {
  const {
    indoorLocation,
    isIndoor,
    error,
    calibrationQuality,
    startIndoorPositioning,
    stopIndoorPositioning
  } = useIndoorNavigation();

  useEffect(() => {
    startIndoorPositioning();
    return () => {
      stopIndoorPositioning();
    };
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isIndoor && indoorLocation ? (
        <>
          <Text>Floor: {indoorLocation.floor}</Text>
          <Text>Latitude: {indoorLocation.latitude.toFixed(6)}</Text>
          <Text>Longitude: {indoorLocation.longitude.toFixed(6)}</Text>
          <Text>Accuracy: {indoorLocation.accuracy.toFixed(2)}m</Text>
          <Text>Calibration: {calibrationQuality}</Text>
        </>
      ) : (
        <Text>Waiting for indoor position...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  error: {
    color: 'red',
  },
});
