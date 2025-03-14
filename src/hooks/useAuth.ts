import { useState, useEffect } from 'react';
import { User } from '../types/user';
import { auth, firestore } from '../config/firebase';
import { AuthService } from '../services/AuthService';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await firestore
          .collection('users')
          .doc(firebaseUser.uid)
          .get();
        
        const userData = userDoc.data() as User;
        setUser({
          ...userData,
          id: firebaseUser.uid,
          email: firebaseUser.email!,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const userDoc = await firestore
        .collection('users')
        .doc(result.user!.uid)
        .get();
      
      const userData = userDoc.data() as User;
      setUser({
        ...userData,
        id: result.user!.uid,
        email: result.user!.email!,
      });
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;

    try {
      await firestore
        .collection('users')
        .doc(user.id)
        .update(data);
      
      setUser({ ...user, ...data });
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    loading,
    signIn,
    signOut,
    updateProfile,
  };
};
