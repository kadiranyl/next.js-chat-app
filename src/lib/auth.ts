import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { showAlert } from "./Toast";


export async function createUser(e: any, email: string, password: string) {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

        showAlert("Kayıt başarılı!", "success")
    })
    .catch((error) => {
        console.log(error);
        showAlert(error, "error")
    });
}


export async function loginUser(e: any, email: string, password: string) {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...

        showAlert("Giriş başarılı!", "success")
    })
    .catch((error) => {
        console.log(error);
        showAlert(error, "error")
    });
}


export async function signOutHandler() {
    signOut(auth).then(() => {
        showAlert("You've signed out.", "error")
    }).catch((error) => {
        console.log(error);
    });
}