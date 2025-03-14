import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { POIMarker } from './POIMarker';
import { NavigationToggle } from './NavigationToggle';
import { FloorSelector } from './FloorSelector';
import { MapAccessDenied } from './MapAccessDenied';
import { NavigationService } from '../services/NavigationService';
import { POI, Route, NavigationMode } from '../types/navigation';
import { User, UserRole } from '../types/auth';

interface NavigationMapProps {
  pois: POI[];
  user: User;
  onPOISelect?: (poi: POI) => void;
}

export const NavigationMap: React.FC<NavigationMapProps> = ({ 
  pois, 
  user,
  onPOISelect 
}) => {
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);
  const [navigationMode, setNavigationMode] = useState<NavigationMode>(NavigationMode.OUTDOOR);
  const [currentFloor, setCurrentFloor] = useState<number>(0);
  const [isIndoorAvailable, setIsIndoorAvailable] = useState<boolean>(false);

  // Check if user has map access
  const hasMapAccess = user.role === UserRole.ADMIN || user.mapAccess;

  useEffect(() => {
    if (hasMapAccess) {
      checkIndoorAvailability();
    }
  }, [hasMapAccess]);

  if (!hasMapAccess) {
    return <MapAccessDenied />;
  }

  // Rest of the NavigationMap component code remains the same
  // ... (previous implementation)
}
