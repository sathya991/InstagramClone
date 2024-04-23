import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useSignupWithEmailAndPassword = () => {
    const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth);
    const showToast = useShowToast()
    const loginUser = useAuthStore(state => state.login)
    const signup = async (inputs) => {
        if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
            showToast("Error", "Please fill all the fields", "error");
            return;
        }
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser && error) {
                showToast("Error", error.message, "error");
                return;
            }
            if (newUser) {
                const userDocument = {
                    uid: newUser.user.uid,
                    email: inputs.email,
                    username: inputs.username,
                    fullName: inputs.fullName,
                    bio: "",
                    profilePicUrl: "",
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
    return { loading, error, signup };
}

export default useSignupWithEmailAndPassword