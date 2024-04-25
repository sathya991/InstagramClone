import React, { useState } from 'react'
import useShowToast from './useShowToast';
import { query } from 'firebase/database';
import { collection, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase/firebase'

const useSearchUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const showToast = useShowToast();
    const getUserProfile = async (username) => {
        setIsLoading(true);
        setUser(null);
        try {
            const q = query(collection(db, "users"), where("username", "==", username));
            const querySnap = await getDocs(q);
            if (querySnap.empty) return showToast("Error", "User not Found", "error");
            querySnap.forEach((doc) => {
                setUser(doc.data());
            })
        } catch (er) {
            showToast("Error", er.message, "error");
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }
    return { user, isLoading, getUserProfile, setUser };
}

export default useSearchUser