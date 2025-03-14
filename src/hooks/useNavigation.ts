import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import * as turf from '@turf/turf';

export const useNavigation = (destination) => {
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [bearing, setBearing] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let locationSubscription;

    const startLocationUpdates = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Location permission denied');
          return;
        }

        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (location) => {
            setUserLocation(location.coords);

            if (destination) {
              // Calculate distance and bearing
              const from = turf.point([location.coords.longitude, location.coords.latitude]);
              const to = turf.point([destination.longitude, destination.latitude]);
              
              const distanceInKm = turf.distance(from, to);
              const bearingDegrees = turf.bearing(from, to);

              setDistance(distanceInKm);
              setBearing(bearingDegrees);
            }
          }
        );
      } catch (err) {
        setError(err.message);
      }
    };

    startLocationUpdates();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [destination]);

  return {
    userLocation,
    distance,
    bearing,
    error,
  };
};
