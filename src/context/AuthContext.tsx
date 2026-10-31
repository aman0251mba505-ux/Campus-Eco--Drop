import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isCollegeEmail: boolean;
  hostel: string;
  ecoPoints: number;
  totalWeightKg: number;
  role: 'student' | 'canteen_vendor' | 'facilities_admin';
}

interface AuthContextType {
  currentUser: AuthUser | null;
  firebaseUser: User | null;
  loading: boolean;
  authError: string | null;
  clearAuthError: () => void;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loginAsDemoStudent: () => void;
  loginWithCustomCollegeEmail: (email: string, name: string, hostel: string) => void;
  updateUserStats: (addedPoints: number, addedWeightKg: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Clean fresh profile for new students
const FRESH_NEW_STUDENT: AuthUser = {
  uid: 'demo-student-aman',
  email: 'aman.0251mba505@dgu.ac.in',
  displayName: 'Aman',
  photoURL: null,
  isCollegeEmail: true,
  hostel: 'Shivalik Boys Hostel',
  ecoPoints: 0,
  totalWeightKg: 0,
  role: 'student',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        const isCollege = Boolean(
          user.email &&
          (user.email.endsWith('@dgu.ac.in') ||
           user.email.includes('dgu') ||
           user.email.endsWith('@gmail.com'))
        );

        const userDocRef = doc(db, 'users', user.uid);
        try {
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            const data = userSnap.data();
            setCurrentUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || 'DGU Student',
              photoURL: user.photoURL,
              isCollegeEmail: isCollege,
              hostel: data.hostel || 'Shivalik Boys Hostel',
              ecoPoints: Number(data.ecoPoints ?? 0),
              totalWeightKg: Number(data.totalWeightKg ?? 0),
              role: data.role || 'student',
            });
          } else {
            // Brand new student profile starts at clean 0
            const initialProfile: AuthUser = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || 'DGU Student',
              photoURL: user.photoURL,
              isCollegeEmail: isCollege,
              hostel: 'Shivalik Boys Hostel',
              ecoPoints: 0,
              totalWeightKg: 0,
              role: 'student',
            };

            await setDoc(userDocRef, {
              ...initialProfile,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
            setCurrentUser(initialProfile);
          }
        } catch (error) {
          console.warn('Could not load user from Firestore, using clean state:', error);
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || 'DGU Student',
            photoURL: user.photoURL,
            isCollegeEmail: isCollege,
            hostel: 'Shivalik Boys Hostel',
            ecoPoints: 0,
            totalWeightKg: 0,
            role: 'student',
          });
        }
      } else {
        // Unauthenticated visitor defaults to null or clean demo
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const clearAuthError = () => setAuthError(null);

  const loginWithGoogle = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      const code = error?.code || '';
      const message = error?.message || '';

      if (code.includes('unauthorized-domain') || message.includes('unauthorized domain')) {
        setAuthError(
          'This domain is not authorized in Firebase. Please add your current domain to Firebase Console -> Authentication -> Settings -> Authorized Domains. Or use the 1-click College Sign-In!'
        );
      } else if (code.includes('popup-blocked')) {
        setAuthError('Sign-in popup was blocked by your browser. Please allow popups or use 1-click sign-in.');
      } else if (code.includes('popup-closed-by-user')) {
        setAuthError('Sign-in popup was closed before completing.');
      } else {
        setAuthError(message || 'Failed to sign in with Google.');
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setCurrentUser(null);
      setFirebaseUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const loginAsDemoStudent = () => {
    setCurrentUser(FRESH_NEW_STUDENT);
    setAuthError(null);
  };

  const loginWithCustomCollegeEmail = (email: string, name: string, hostel: string) => {
    const isCollege = email.endsWith('@dgu.ac.in') || email.includes('dgu');
    // Clean fresh new user stats = 0
    setCurrentUser({
      uid: `student-${Date.now()}`,
      email,
      displayName: name,
      photoURL: null,
      isCollegeEmail: isCollege,
      hostel: hostel || 'Shivalik Boys Hostel',
      ecoPoints: 0,
      totalWeightKg: 0,
      role: 'student',
    });
    setAuthError(null);
  };

  const updateUserStats = async (addedPoints: number, addedWeightKg: number) => {
    if (!currentUser) return;
    const newPoints = currentUser.ecoPoints + addedPoints;
    const newWeight = Number((currentUser.totalWeightKg + addedWeightKg).toFixed(2));

    setCurrentUser((prev) =>
      prev ? { ...prev, ecoPoints: newPoints, totalWeightKg: newWeight } : null
    );

    if (firebaseUser) {
      try {
        const userRef = doc(db, 'users', firebaseUser.uid);
        await setDoc(
          userRef,
          {
            ecoPoints: newPoints,
            totalWeightKg: newWeight,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      } catch (err) {
        console.warn('Could not sync user stats to Firestore:', err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        firebaseUser,
        loading,
        authError,
        clearAuthError,
        loginWithGoogle,
        logout,
        loginAsDemoStudent,
        loginWithCustomCollegeEmail,
        updateUserStats,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
