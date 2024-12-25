import { createContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import auth from '../../firebase/firebase.config';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (email, password) => {
    setLoading(true);
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logOutUser = async () => {
    setLoading(true);
    try {
      return await signOut(auth);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const userUpdateProfile = async (name, photoURL) => {
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logOutUser,
    userUpdateProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
