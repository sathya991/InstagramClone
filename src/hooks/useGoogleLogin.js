import React from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/firebase';
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const useGoogleLogin = () => {
    const [signInWithGoogle, , loading, error] = useSignInWithGoogle(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);
    const googleLogin = async () => {
        try {
            const newUser = await signInWithGoogle();
            if (!newUser && error) {
                showToast("Error", er.message, "error");
                return;
            }
            const userRef = doc(db, "users", newUser.user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const userDoc = userSnap.data();
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
            }
            else {
                const userDocument = {
                    uid: newUser.user.uid,
                    email: newUser.user.email,
                    username: newUser.user.email.split("@")[0],
                    fullName: newUser.user.displayName,
                    bio: "",
                    profilePicUrl: newUser.user.photoURL,
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now()
                }
                await setDoc(doc(db, "users", newUser.user.uid), userDocument);
                localStorage.setItem("user-info", JSON.stringify(userDocument));
                loginUser(userDocument);
            }
        }
        catch (er) {
            showToast("Error", er.message, "error");
        }
    }
    return { loading, error, googleLogin };
}

export default useGoogleLogin