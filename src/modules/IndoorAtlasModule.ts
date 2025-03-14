import { NativeModules } from 'react-native';

const { IndoorAtlasModule } = NativeModules;

export interface IndoorAtlasInterface {
  startPositioning(): void;
  stopPositioning(): void;
  getCurrentLocation(): Promise<{
    latitude: number;
    longitude: number;
    floor: number;
  }>;
}

export { IndoorAtlasModule };
