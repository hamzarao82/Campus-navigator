import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export const LoadingState = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);
