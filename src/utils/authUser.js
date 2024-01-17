import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { db } from "../firebase.config";
import { doc, setDoc } from "firebase/firestore";


export const signupUser = async (email, password, name, uname) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            username: uname,
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