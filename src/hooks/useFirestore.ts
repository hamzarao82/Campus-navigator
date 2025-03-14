import { db } from '../utils/firebase';
import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';

export const useFirestore = () => {
  const updatePermissions = async (permissions) => {
    try {
      await updateDoc(doc(db, 'settings', 'permissions'), permissions);
      return true;
    } catch (error) {
      console.error('Error updating permissions:', error);
      return false;
    }
  };

  const fetchPOIs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'points'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching POIs:', error);
      return [];
    }
  };

  const addPOI = async (poiData) => {
    try {
      await addDoc(collection(db, 'points'), poiData);
      return true;
    } catch (error) {
      console.error('Error adding POI:', error);
      return false;
    }
  };

  const deletePOI = async (id) => {
    try {
      await deleteDoc(doc(db, 'points', id));
      return true;
    } catch (error) {
      console.error('Error deleting POI:', error);
      return false;
    }
  };

  return {
    updatePermissions,
    fetchPOIs,
    addPOI,
    deletePOI
  };
};
