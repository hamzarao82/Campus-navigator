import { useState, useEffect } from 'react';
import { IndoorAtlasModule } from '../modules/IndoorAtlasModule';
import { POI, Location } from '../types/navigation';
import { NavigationService } from '../services/NavigationService';

export const useIndoorNavigation = () => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [currentFloor, setCurrentFloor] = useState<number>(1);
  const [nearbyPOIs, setNearbyPOIs] = useState<POI[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const locationSubscription = IndoorAtlasModule.addLocationListener((location) => {
      setCurrentLocation(location);
    });

    const floorSubscription = IndoorAtlasModule.addFloorListener((floor) => {
      setCurrentFloor(floor);
      updateNearbyPOIs(floor);
    });

    return () => {
      locationSubscription.remove();
      floorSubscription.remove();
    };
  }, []);

  const updateNearbyPOIs = async (floor: number) => {
    const pois = await NavigationService.getNearbyPOIs(floor);
    setNearbyPOIs(pois);
  };

  const startNavigation = (destination: POI) => {
    setIsNavigating(true);
    IndoorAtlasModule.startNavigation(destination);
  };

  const stopNavigation = () => {
    setIsNavigating(false);
    IndoorAtlasModule.stopNavigation();
  };

  return {
    currentLocation,
    currentFloor,
    nearbyPOIs,
    isNavigating,
    startNavigation,
    stopNavigation,
  };
};
