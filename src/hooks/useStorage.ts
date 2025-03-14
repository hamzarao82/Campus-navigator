import { storage } from '../utils/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const useStorage = () => {
  const uploadMap = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      
      const mapRef = ref(storage, 'maps/current.jpg');
      await uploadBytes(mapRef, blob);
      
      const url = await getDownloadURL(mapRef);
      return url;
    } catch (error) {
      console.error('Error uploading map:', error);
      return null;
    }
  };

  return {
    uploadMap
  };
};
