import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../lib/firebase';

interface AuthUser {
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
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loginAsDemoStudent: () => void;
  updateUserStats: (addedPoints: number, addedWeightKg: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_STUDENT: AuthUser = {
  uid: 'demo-student-aman',
  email: 'aman.0251mba505@dgu.ac.in',
  displayName: 'Aman (DGU Student)',
  photoURL: null,
  isCollegeEmail: true,
  hostel: 'Shivalik Boys Hostel',
  ecoPoints: 385,
  totalWeightKg: 18.6,
  role: 'student',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(DEMO_STUDENT);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        const isCollege = Boolean(
          user.email &&
          (user.email.endsWith('@dgu.ac.in') ||
           user.email.includes('dgu') ||
           user.email.endsWith('@gmail.com')) // allow student testing
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
              ecoPoints: data.ecoPoints ?? 100,
              totalWeightKg: data.totalWeightKg ?? 2.5,
              role: data.role || 'student',
            });
          } else {
            // Create initial profile in Firestore
            const initialProfile: AuthUser = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || 'DGU Student',
              photoURL: user.photoURL,
              isCollegeEmail: isCollege,
              hostel: 'Shivalik Boys Hostel',
              ecoPoints: 50, // Welcome bonus
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
          console.warn('Could not load user from Firestore, using session state:', error);
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || 'DGU Student',
            photoURL: user.photoURL,
            isCollegeEmail: isCollege,
            hostel: 'Shivalik Boys Hostel',
            ecoPoints: 120,
            totalWeightKg: 3.2,
            role: 'student',
          });
        }
      } else {
        // Fallback to active demo student so app is always interactive
        setCurrentUser(DEMO_STUDENT);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Logged in user:', result.user.email);
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      alert(`Sign in: ${error.message || 'Please enable popups to sign in'}`);
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const loginAsDemoStudent = () => {
    setCurrentUser(DEMO_STUDENT);
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
        loginWithGoogle,
        logout,
        loginAsDemoStudent,
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
