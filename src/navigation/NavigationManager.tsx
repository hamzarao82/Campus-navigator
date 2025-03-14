import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { IndoorNavigation } from './IndoorNavigation';
import { OutdoorNavigation } from './OutdoorNavigation';

export const NavigationManager = () => {
  const [isIndoor, setIsIndoor] = useState(false);

  useEffect(() => {
    // Logic to detect indoor/outdoor transition
    // Will be implemented based on signal strength and GPS accuracy
  }, []);

  return (
    <View style={styles.container}>
      {isIndoor ? <IndoorNavigation /> : <OutdoorNavigation />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
