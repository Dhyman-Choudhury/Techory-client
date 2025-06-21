import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.congif';

 export const AuthContext = createContext();
 const provider = new GoogleAuthProvider()

 
const AuthProvider = ({children}) => {
    
    const [user, setUser]=useState(null);
    const [success, setSuccess]=useState(null)
    const [loading, setLoading]=useState(true)

    const signUp = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const login=(email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleLogin=()=>{
        setLoading(true)
        // setSuccess(user)
        return signInWithPopup(auth, provider)
    }
    const logout =()=>{
        setLoading(true)
        // setSuccess(null)
        return signOut(auth);
    }
    
   
    const updateUser=(updatedData)=>{
        return updateProfile(auth.currentUser,updatedData)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
                // setSuccess(currentUser);
            
            
            setLoading(false)
        });
        return ()=>{
            unsubscribe();
        }
    },[])

    const userInfo = {
        signUp,
        login,
        googleLogin,
        logout,
        user,
        setUser,
        success,
        setSuccess,
        updateUser,
        loading,
        setLoading

    }
    return (
       <AuthContext value={userInfo}>{children}</AuthContext>
    );
};

export default AuthProvider;