
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, where, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.config";

export const getCurrentUser = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user.uid);

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        console.log(docSnap.data());
        return docSnap.data();
    }
    else {
        console.log("No such document!");
        return null;
    }
}

export const getUser = async (username) => {
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if(querySnapshot.empty) {
        console.log("No such document!");
        return null;
    }
    else {
        console.log(querySnapshot.docs[0].data());
        return querySnapshot.docs[0].data();
    }
}

export const uploadProfile = async (file, username) => {
    console.log(file);
    const storageRef = ref(storage, `profile/${username}`);
    const uploadTask = await uploadBytes(storageRef, file);
    console.log(uploadTask);
    const url = await getDownloadURL(uploadTask.ref);
    console.log(url);
    return url;
}

export const changeProfile = async (url) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, {
        profile: url,
    });
}