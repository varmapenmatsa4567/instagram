import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase.config";


export const isEmailValid = (email) => {
    // check if email is valid with reg expression
    const regExp = /\S+@\S+\.\S+/;
    if(!regExp.test(email)) {
        return false;
    }
    return true;

}

export const validateEmail = async (email, setEmail, setValidEmail) => {
    setEmail(email);
    // check if email is valid with reg expression
    const regExp = /\S+@\S+\.\S+/;
    if(!regExp.test(email)) {
        setValidEmail(false);
        console.log('invalid email')
        return;
    }

    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if(querySnapshot.size > 0) {
        setValidEmail(false);
        console.log('email already exists')
    }
    else {
        setValidEmail(true);
        console.log('email is valid')
    }
}

export const validatePassword = (password, setPassword, setValidPassword) => {
    setPassword(password);
    if(password.length < 6) {
        setValidPassword(false);
        console.log('password is too short')
    }
    else {
        setValidPassword(true);
        console.log('password is valid')
    }
}

export const validateUname = async (uname, setUname, setValidUname) => {
    setUname(uname);
    if(uname.length < 6) {
        setValidUname(false);
        console.log('username is too short')
        return;
    }

    const q = query(collection(db, "users"), where("username", "==", uname));
    const querySnapshot = await getDocs(q);
    if(querySnapshot.size > 0) {
        setValidUname(false);
        console.log('username already exists')
    }
    else {
        setValidUname(true);
        console.log('username is valid')
    }
}

export const validateName = (name, setName, setValidName) => {
    setName(name);
    if(name.length < 3) {
        setValidName(false);
        console.log('name is too short')
    }
    else {
        setValidName(true);
        console.log('name is valid')
    }
}