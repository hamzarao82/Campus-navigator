export const IndoorAtlasConfig = {
  API_KEY: 'YOUR_API_KEY',
  API_SECRET: 'YOUR_API_SECRET'
};

export const initializeIndoorAtlas = () => {
  if (Platform.OS === 'ios') {
    IndoorAtlasModule.initialize(IndoorAtlasConfig.API_KEY, IndoorAtlasConfig.API_SECRET);
  }
};
