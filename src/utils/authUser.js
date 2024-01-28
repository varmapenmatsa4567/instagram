import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { db } from "../firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

export const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('logged out');
    }).catch((error) => {
      console.log(error);
    });
}

export const signupUser = async (email, password, name, uname) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            username: uname,
            profile: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        });
        return user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        return null;
    }
}

export const loginUser = async (email, password) => {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(userCredential);
        return user;
    }
    catch(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        return null;
    }
}