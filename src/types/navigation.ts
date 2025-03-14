// Add to existing types
export enum NavigationMode {
  INDOOR = 'indoor',
  OUTDOOR = 'outdoor'
}

// Add to existing interfaces
export interface NavigationState {
  mode: NavigationMode;
  currentFloor?: number;
  isIndoorMapAvailable: boolean;
}
